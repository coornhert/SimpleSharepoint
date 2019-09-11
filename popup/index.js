function print(args) { console.log(args); }

var buttons = [];
var buttonValues = [];
var usedLinks = [];
var form;

function requestLinks() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "../links.json", false);
  xmlHttp.send(null);
  links = JSON.parse(xmlHttp.responseText);
  browser.storage.sync.set({
    SimpleSharepointLinks: links
  });
  print("set");
}

function addButtons() {

  for (var i = 0; i < links.length; i++) {
      container = document.createElement("div");
      container.className = "container";

      var name = document.createElement("div")
      name.innerHTML = links[i]["name"];
      name.className = "text";

      var buttonContainer = document.createElement("div");
      buttonContainer.className = "buttonContainer";

      var label = document.createElement("label");
      label.className = "switch";

      var button = document.createElement("input");
      button.type = "checkbox";
      button.id = i;
      button.checked = buttonValues[i];
      var span = document.createElement("span");
      span.className = "slider";

      buttonContainer.appendChild(label);

      label.appendChild(button);
      label.appendChild(span);

      container.appendChild(name);
      container.appendChild(buttonContainer);

      buttons.push(container);

      button.addEventListener("click", saveOptions)

      form.appendChild(container);
  }

}

window.onload = function() {

    form = document.createElement("form");
    form.id = "mainForm";
    document.body.appendChild(form);

    restoreOptions();

  }

  function saveOptions(e) {
    b = e["target"];
    buttonValues[b.id] = b.checked;
    print(buttonValues);
    browser.storage.sync.set({
      SimpleSharepointSettings: buttonValues
    });
    usedLinks = [];
    for (var i = 0; i < links.length; i++) { if (buttonValues[i]) {usedLinks.push(links[i])} } 
    browser.storage.sync.set({
      SimpleSharepointUsed: usedLinks
    });
  }

  function returnSettings(result) {
    buttonValues = result["SimpleSharepointSettings"];
    if (buttonValues == undefined) {
      buttonValues = new Array(links.length).fill(false);
    }
    addButtons();
  }

  function returnLinks(result) {
    links = result["SimpleSharepointLinks"];
    if (links == undefined) {
      requestLinks();
    }
  }

  function restoreOptions() {

    function onError(error) {
      console.log(`Error: ${error}`);
    }

    var rlinks = browser.storage.sync.get("SimpleSharepointLinks");
    rlinks.then(returnLinks, onError);

    var settings = browser.storage.sync.get("SimpleSharepointSettings");
    settings.then(returnSettings, onError);

  }