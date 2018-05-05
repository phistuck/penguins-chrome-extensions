/*jslint white: true, sloppy: true, browser: true*/
var penguins = {};
penguins.isStandalone = document.location.search.includes("standalone");
penguins.flashURL =
 //"http://hosting.gmodules.com/" +
 //"ig/gadgets/file/112581010116074801021/"
 "/penguins.swf";
penguins.fullFlashURL = "";

penguins.getSetting =
 function (key, omit)
 {
  var value =
       localStorage[key] ||
       document.querySelector("[name=" + key +"]")
        .getAttribute("data-default-value");
  if (omit)
  {
   value = value.replace(omit, "");
  }
  return value;
 };
penguins.getSettingParameters =
 function ()
 {
  return "?up_backgroundColor=" + penguins.getSetting("background-color") +
         "&up_numPenguins=" + penguins.getSetting("total-count") +
         "&up_backgroundImage=" + penguins.getSetting("background-image") +
         "&up_numBabies=" + penguins.getSetting("kid-subset-count");
 };
penguins.setSetting =
 function (e)
 {
  var source = e.target, value = source.value,
      name = source.getAttribute("name");
  if (!source.validity.valid)
  {
   return;
  }

  if (name === "background-color" && value && value.indexOf("#") !== -1)
  {
   value.replace("#", "");
  }
  value = value || source.getAttribute("data-default-value");

  localStorage[name] = value;

  penguins.initialize();
 };
penguins.initialize = 
 function ()
 {
  if (penguins.isStandalone)
  {
   document.body.classList.add("standalone");
  }
  penguins.synchronizeSettings();
  penguins.fullFlashURL = penguins.flashURL + penguins.getSettingParameters();
  penguins.createEmbed();
  if (penguins.isStandalone)
  {
   penguins.createFullScreenLink();
  }
  penguins.createSettingLink();
  if (!penguins.isStandalone)
  {
   penguins.createNewTabLink();
  }
  penguins.initializeSettingDialog();
 };
penguins.synchronizeSettings =
 function ()
 {
  var i, length, fields = document.querySelectorAll("input");
  /*jslint plusplus: true*/
  for (i = 0, length = fields.length; i < length; i++)
  {
  /*jslint plusplus: false*/
   fields[i].value =
    penguins.getSetting(fields[i].getAttribute("name"), "http://");
  }
 };
penguins.createEmbed =
 function ()
 {
  var embed = document.createElement("embed"),
      oldEmbed = document.querySelector("embed");
  embed.src = penguins.fullFlashURL;
  embed.setAttribute("wmode", "transparent");
  if (oldEmbed)
  {
   document.body.replaceChild(embed, oldEmbed);
  }
  else
  {  
   document.body.appendChild(embed);
  }
 };
penguins.createFullScreenLink =
 function ()
 {
  var link = penguins.createLink("#", "full-screen", "Go full screen");
  link.onclick =
   function (e)
   {
    e.preventDefault();
    if (document.documentElement.requestFullscreen)
    {
     document.documentElement.requestFullscreen();
    }
    else if (document.documentElement.webkitRequestFullscreen)
    {
     document.documentElement.webkitRequestFullscreen();
    }
    else if (document.documentElement.mozRequestFullscreen)
    {
     document.documentElement.mozRequestFullscreen();
    }
    else if (document.documentElement.msRequestFullscreen)
    {
     document.documentElement.msRequestFullscreen();
    }
   };
  penguins.appendOrReplace(link);
 };
penguins.appendOrReplace =
 function (link)
 {
  var oldLink = document.querySelector("#" + link.id);
  if (oldLink)
  {
   document.body.replaceChild(link, oldLink);
  }
  else
  {
   document.body.appendChild(link);
  }
 };
penguins.createSettingLink =
 function ()
 {
  var link =
       penguins.createLink(
        "#", "setting-link", "Settings");
  link.onclick =
   function (e)
   {
    e.preventDefault();
    document.querySelector("#settings").hidden = false;
   };
  penguins.appendOrReplace(link);
 };
penguins.createLink =
 function (hRef, id, text)
 {
  var link = document.createElement("a");
  link.href = hRef;
  link.id = id;
  link.textContent = text;
  return link;
 };
penguins.createNewTabLink =
 function ()
 {
  var link =
       penguins.createLink(
        "?standalone=1", "new-tab", "Open in a new tab");
  link.target = "_blank";
  penguins.appendOrReplace(link);
 };
penguins.initializeSettingDialog =
 function ()
 {
  document.querySelector("#settings A").onclick =
   function (e)
   {
    e.preventDefault();
    document.querySelector("#settings").hidden = true;
   };
  document.querySelector("#setting-form").oninput = penguins.setSetting;
 };
penguins.initialize();