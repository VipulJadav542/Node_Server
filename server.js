var express = require('express');
var app = express();
var fs = require("fs");
const os = require("os");
const port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Arbitrary ID manager since we don't use a database
var index = 5;

// Initializing Destinations Array.. It will behave like a dummy database 
var destinations = [
    {
        "id": 1,
        "city": "Mumbai",
        "url": "https://avatars.githubusercontent.com/u/18?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "India"
    },
    {
        "id": 2,
        "city": "Melbourne",
        "url": "https://avatars.githubusercontent.com/u/1?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "Australia"
    },
    {
        "id": 3,
        "city": "Washington DC",
        "url": "https://avatars.githubusercontent.com/u/4?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "USA"
    },
    {
        "id": 4,
        "city": "New Delhi",
        "url": "https://avatars.githubusercontent.com/u/6?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "India"
    },
    {
        "id": 5,
        "city": "Tokyo",
        "url": "https://avatars.githubusercontent.com/u/7?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "Japan"
    },
    {
        "id": 6,
        "city": "Rajkot",
        "url": "https://avatars.githubusercontent.com/u/17?v=4",
        "description": "vipul Jadav",
        "country": "India"
    },
    {
        "id": 1,
        "city": "Mumbai",
        "url": "https://avatars.githubusercontent.com/u/18?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "India"
    },
    {
        "id": 2,
        "city": "Melbourne",
        "url": "https://avatars.githubusercontent.com/u/1?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "Australia"
    },
    {
        "id": 3,
        "city": "Washington DC",
        "url": "https://avatars.githubusercontent.com/u/4?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "USA"
    },
    {
        "id": 4,
        "city": "New Delhi",
        "url": "https://avatars.githubusercontent.com/u/6?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "India"
    },
    {
        "id": 5,
        "city": "Tokyo",
        "url": "https://avatars.githubusercontent.com/u/7?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "Japan"
    },
    {
        "id": 6,
        "city": "Rajkot",
        "url": "https://avatars.githubusercontent.com/u/17?v=4",
        "description": "vipul Jadav",
        "country": "India"
    },
    {
        "id": 1,
        "city": "Mumbai",
        "url": "https://avatars.githubusercontent.com/u/18?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "India"
    },
    {
        "id": 2,
        "city": "Melbourne",
        "url": "https://avatars.githubusercontent.com/u/1?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "Australia"
    },
    {
        "id": 3,
        "city": "Washington DC",
        "url": "https://avatars.githubusercontent.com/u/4?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "USA"
    },
    {
        "id": 4,
        "city": "New Delhi",
        "url": "https://avatars.githubusercontent.com/u/6?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "India"
    },
    {
        "id": 5,
        "city": "Tokyo",
        "url": "https://avatars.githubusercontent.com/u/7?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "Japan"
    },
    {
        "id": 6,
        "city": "Rajkot",
        "url": "https://avatars.githubusercontent.com/u/17?v=4",
        "description": "vipul Jadav",
        "country": "India"
    },
    {
        "id": 1,
        "city": "Mumbai",
        "url": "https://avatars.githubusercontent.com/u/18?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "India"
    },
    {
        "id": 2,
        "city": "Melbourne",
        "url": "https://avatars.githubusercontent.com/u/1?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "Australia"
    },
    {
        "id": 3,
        "city": "Washington DC",
        "url": "https://avatars.githubusercontent.com/u/4?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "USA"
    },
    {
        "id": 4,
        "city": "New Delhi",
        "url": "https://avatars.githubusercontent.com/u/6?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "India"
    },
    {
        "id": 5,
        "city": "Tokyo",
        "url": "https://avatars.githubusercontent.com/u/7?v=4",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan quis justo quis hendrerit. Curabitur a ante neque. Fusce nec mauris sodales, auctor sem at, luctus eros. Praesent aliquam nibh neque. Duis ut suscipit justo, id consectetur orci. Curabitur ultricies nunc eu enim dignissim, sed laoreet odio blandit.",
        "country": "Japan"
    },
    {
        "id": 6,
        "city": "Rajkot",
        "url": "https://avatars.githubusercontent.com/u/17?v=4",
        "description": "vipul Jadav",
        "country": "India"
    }
];


// A promo message to user 
var message = "Black Friday! Get 50% cashback on saving your first spot.";

app.get('/messages', function (req, res) {
    res.json(message);
});

// Get the list of destinations, convert it to JSON and send it back to client 
app.get('/destination', function (req, res) {
    var count = req.query.count != undefined ? req.query.count : req.query.count = 100;
    if (req.query.country) {
        var countrySpots = destinations.filter(function (destination) {
            return destination.country == req.query.country;
        });
        res.json(countrySpots.slice(0, count));
    }
    else {
        res.json(destinations.slice(0, count));
    }
});

// Get one particular Destination using ID 
app.get('/destination/:id', function (req, res) {
    var destination = destinations.find(d => d.id == req.params.id);
    if (!destination) {
        res.status(404).send("Destination not found.");
    } else {
        res.json(destination);
    }
});

// Create a new Destination and add it to existing Destinations list 
app.post('/destination', function (req, res) {
    var newDestination = {
        "city": req.body.city,
        "description": req.body.description,
        "country": req.body.country,
        "id": ++index
    };

    destinations.push(newDestination);
    res.status(201).json(newDestination);
});

// Update a Destination 
app.put('/destination/:id', function (req, res) {
    var destination = destinations.find(d => d.id == req.params.id);
    if (!destination) {
        res.status(404).send("Destination not found.");
    } else {
        destination.city = req.body.city;
        destination.description = req.body.description;
        destination.country = req.body.country;
        res.json(destination);
    }
});

// Delete a Destination 
app.delete('/destination/:id', function (req, res) {
    var index = destinations.findIndex(d => d.id == req.params.id);
    if (index === -1) {
        res.status(404).send("Destination not found.");
    } else {
        destinations.splice(index, 1);
        res.sendStatus(204);
    }
});

// Home Page 
app.get('/destination', (req, res) => res.send('Welcome! You are all set to go!'));

// Configure server 
// var server = app.listen(9000, '127.0.0.1', function () {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log(`Server running at http://${host}:${port}`);
// });


// Get the host machine's IP addresses
const networkInterfaces = os.networkInterfaces();
const addresses = [];
for (const interface of Object.values(networkInterfaces)) {
    for (const { address, family, internal } of interface) {
        if (family === "IPv4" && !internal) {
            addresses.push(address);
        }
    }
}

// Start the server, listening on all available network interfaces
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Available IP addresses:`);
    addresses.forEach((address) => {
        console.log(`  http://${address}:${port}`);
    });

});