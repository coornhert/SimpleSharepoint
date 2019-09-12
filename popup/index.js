function print(args) { console.log(args); }

var buttons = [];
var buttonValues = {};
var links;
var sorted;
var form;
var cols;
var platform;

try {
  browser;
  platform = "firefox";
}
catch (error) {
  platform = "chrome";
}

function requestLinks() {
  links = [
    {"order": 0, "used": true, "name": "Agenda", "link": "https://outlook.office365.com/owa/?realm=coornhert.onmicrosoft.com&exsvurl=1&ll-cc=1043&modurl=1", "image": "https://coornhert.sharepoint.com/pictos/agenda.png"},
    {"order": 1, "used": true, "name": "Keuzerooster", "link": "https://coornhert.sharepoint.com/kernkeuze", "image": "https://coornhert.sharepoint.com/Pictos/kernkeuze.PNG"},
    {"order": 2, "used": true, "name": "Learnbeat", "link": "https://inloggen.learnbeat.nl/users/login", "image": "https://i.postimg.cc/QdxbZPx3/lb.png"},
    {"order": 3, "used": true, "name": "Leerlingenraad", "link": "https://coornhert.sharepoint.com/Leerlingenraad/Forms/AllItems.aspx", "image": "https://coornhert.sharepoint.com/pictos/personen.png"},
    {"order": 4, "used": true, "name": "Liber", "link": "https://coornhert.sharepoint.com/sites/liber", "image": "https://coornhert.sharepoint.com/pictos/liber.png"},
    {"order": 5, "used": true, "name": "Mail", "link": "https://outlook.office365.com/owa/?realm=coornhert.onmicrosoft.com&exsvurl=1&ll-cc=1043&modurl=0", "image": "https://coornhert.sharepoint.com/pictos/email.png"},
    {"order": 6, "used": true, "name": "OneDrive Personal", "link": "https://coornhert-my.sharepoint.com/_layouts/15/MySite.aspx", "image": "https://coornhert.sharepoint.com/pictos/onedrive.png"},
    {"order": 7, "used": true, "name": "OneDrive School", "link": "https://coornhert-my.sharepoint.com/personal/documentbeheer_coornhert-gymnasium_nl/Documents/Coornhert", "image": "https://coornhert.sharepoint.com/pictos/onedrive.png"},
    {"order": 8, "used": true, "name": "Roosterpunt", "link": "https://saml.roosterpunt.nl/auth/azure_start.php", "image": "https://coornhert.sharepoint.com/pictos/roosterpunt.png"},
    {"order": 9, "used": true, "name": "SOM", "link": "https://somtoday.nl/azure?tenant=coornhert-gymnasium.nl", "image": "https://coornhert.sharepoint.com/Pictos/SOM2DAY.png"},
    {"order": 10, "used": true, "name": "WisWeb", "link": "https://app.dwo.nl/leerling/", "image": "http://www.michelhoekstra.net/wp-content/uploads/2016/01/Numworx-Favicon-300x300.png"},
    {"order": 11, "used": true, "name": "Zermelo", "link": "https://myapps.microsoft.com/signin/Zermelo/f999fd7a82784b578691fe3af2c9a17d", "image": "https://coornhert.sharepoint.com/pictos/zermelo.png"}
  ]
  save();
}

// Buttons

function addButtons() {
  sorted = links.sort(dynamicSort("order"));
  console.log(sorted);
  for (var i = 0; i < links.length; i++) {
      container = document.createElement("div");
      container.className = "container";
      container.setAttribute("draggable", true);

      var name = document.createElement("div")
      name.innerHTML = sorted[i]["name"];
      name.className = "text";
      name.id = i;

      var buttonContainer = document.createElement("div");
      buttonContainer.className = "buttonContainer";

      var label = document.createElement("label");
      label.className = "switch";

      var button = document.createElement("input");
      button.type = "checkbox";
      button.id = i;
      button.checked = sorted[i].used;
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

  cols = document.querySelectorAll('.container');
  console.log(cols);
  [].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false)
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
  });

}

// Save and Load

function save() {
  if (platform == "firefox") {
    browser.storage.sync.set({
      SimpleSharepointLinks: links
    });
  }
  else if (platform == "chrome") {
    chrome.storage.sync.set({
      "SimpleSharepointLinks": links
    });
  }
}

function saveOptions(e) {
  b = e["target"];
  links[b.id]["used"] = b.checked;
  save();
}

function returnLinks(result) {
  links = result["SimpleSharepointLinks"];
  if (links == undefined) {
    requestLinks();
  }
  console.log(links);
  addButtons();
}

function restoreOptions() {

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  if (platform == "firefox") {
    var rlinks = browser.storage.sync.get("SimpleSharepointLinks");
    rlinks.then(returnLinks, onError);
  }
  else if (platform == "chrome") {
    try{
      var rlinks = chrome.storage.sync.get(["SimpleSharepointLinks"], returnLinks);
    }
    catch (error) {
      requestLinks();
      addButtons();
    }
  }
}

// Drag and Drop

var dragSrcEl = null;

function handleDragStart(e) {
    // Target (this) element is the source node.
    this.style.opacity = ".4";

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
    // this/e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the column we dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
        console.log(dragSrcEl.children[0]);
        dragSrcEl.children[1].children[0].children[0].checked = links[dragSrcEl.children[0].id].used;
        oldOrder = links[dragSrcEl.children[0].id].order;
        this.innerHTML = e.dataTransfer.getData('text/html');
        this.children[1].children[0].children[0].checked = links[this.children[0].id].used;
        links[dragSrcEl.children[0].id].order = links[this.children[0].id].order;
        links[this.children[0].id].order = oldOrder;
        save();
    }

    dragSrcEl.style.opacity = "1";

    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.

    [].forEach.call(cols, function (col) {
        col.classList.remove('over');
    });
}

function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

window.onload = function() {

  form = document.createElement("form");
  form.id = "mainForm";
  document.body.appendChild(form);

  restoreOptions();
  
}