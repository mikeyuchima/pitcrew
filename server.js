const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 8080;
const db = require("./db");

//****************************************

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//****************************************

let techs = [];

let tickets = [];

//****************************************

app.get("/dashboard", (req, res) => {
  res.render({
    activeUsers
  });
});

app.post("/login", (req, res) => {
  const data = req.body;
  db.checkUser(data)
    .then(query => {
      console.log(`USER EXISTS`);
      data.availability = true;
      data.id = query.id;
      techs.push(data);
      console.log("tech list", techs);
      res.send(data);
    })
    .catch(error => {
      console.log(`ERROR ${error}`);
    });
});

app.get("/fetchAvailableTechs", (req, res) => {
  res.send({
    techs
  });
  console.log("---------------------------------");
  console.log("Techs available: ", techs);
});

app.post("/register", (req, res) => {
  const data = req.body;
  db.checkRegister(data)
    .then(() => {
      if (data.type === "Dispatch") {
        db.registerDispatch(data);
        res.send(data);
      } else if (data.type === "Technician") {
        db.registerTechnician(data);
        res.send(data);
      }
    })
    .catch(error => {
      console.log(`ERROR ${error}`);
    });
});

app.post("/newTicket", (req, res) => {
  let data = req.body;
  console.log("NEW TICKET", data);
  db.openTicket(data);
  tickets.push(data);
  tickets.push({
    id: parseInt(data.id),
    location: {
      lat: parseFloat(data.lat),
      lng: parseFloat(data.lng)
    },
    type: "rider"
  });
});

app.get("/fetchTickets", (req, res) => {
  const data = req.body;
  data.status = "pending";
  db.getTickets(data).then(data => {
    tickets = data;
    for (var ticket in tickets) {
      tickets[ticket].lat = parseFloat(tickets[ticket].lat);
      tickets[ticket].lng = parseFloat(tickets[ticket].lng);
    }
    console.log(`TICKET DATA IN SERVER`, tickets);
  });
  res.send({
    tickets
  });
});

app.post("/completeTicket", (req, res) => {
  const data = req.body;
  var ticket_to_be_completed = tickets.find(function(ticket) {
    return ticket.id == data.ticket_id;
  });
  ticket_to_be_completed.status = "completed";
  console.log("Completed ticket >>", ticket_to_be_completed);
  let tempData = {
    id: parseInt(data.ticket_id),
    status: "completed"
  };
  console.log(tempData);
  db.updateTicket(tempData);
});

//****************************************

app.listen(PORT, () => {
  console.log(`PitCrew app listening on port ${PORT}!`);
  console.log("ooo eee can do!");
});

//****************************************

const WebSocket = require("ws");
// const express = require("express");
const SocketServer = WebSocket.Server;

// Set the port to 3001
const _PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(_PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${_PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({
  server
});

let clients = {};

// Broadcast to all.
wss.broadcast = function broadcast(data) {};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  // console.log("Client...", wss.clients);

  ws.on("message", function incoming(data) {
    message = JSON.parse(data);
    console.log(message);

    switch (message.type) {
      case "id":
        console.log(`... id: ${message.id} is connected`);
        clients[message.id] = ws;
        clients[message.id].send(JSON.stringify("TECH IS CONNECTED..."));
        break;
      case "dispatch":
        // const data = req.body;
        console.log("id >>> ", message);
        var tech = techs.find(function(tech) {
          return tech.id == message.id;
        });
        message.id = parseFloat(message.id);
        tech.availability = false;
        db.assignTech(tech);
        console.log(
          message.rider + " is assigned to tech with id: " + message.id
        );

        const assignMessage = {
          content: `...YOU ARE ASSGINED TO ${message.rider}`,
          ticket_id: message.ticket.id,
          ticket: message.ticket,
          type: "notification"
        };
        clients[message.id].send(JSON.stringify(assignMessage));
        break;
      default:
        throw new Error("Unknown event type", message.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
