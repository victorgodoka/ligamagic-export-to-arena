var $ = $ || jQuery;
var decksInPage = $(".embed-deck-separator");

const adentureChecklist = [
  "Oakhame Ranger // Bring Back",
  "Tuinvale Treefolk // Oaken Boon",
  "Rosethorn Acolyte // Seasonal Ritual",
  "Lovestruck Beast // Heart's Desire",
  "Garenbrig Carver // Shield's Might",
  "Flaxen Intruder // Welcome Home",
  "Curious Pair // Treats to Share",
  "Beanstalk Giant // Fertile Footsteps",
  "Rimrock Knight // Boulder Rush",
  "Merchant of the Vale // Haggle",
  "Embereth Shieldbreaker // Battle Display",
  "Bonecrusher Giant // Stomp",
  "Smitten Swordmaster // Curry Favor",
  "Reaper of Night // Harvest Fear",
  "Order of Midnight // Alter Fate",
  "Murderous Rider // Swift End",
  "Foulmire Knight // Profane Insight",
  "Queen of Ice // Rage of Winter",
  "Merfolk Secretkeeper // Venture Deeper",
  "Hypnotic Sprite // Mesmeric Glare",
  "Fae of Wishes // Granted",
  "Brazen Borrower // Petty Theft",
  "Animating Faerie // Bring to Life",
  "Silverflame Squire // On Alert",
  "Shepherd of the Flock // Usher to Safety",
  "Realm-Cloaked Giant // Cast Off",
  "Lonesome Unicorn // Rider in Need",
  "Giant Killer // Chop Down",
  "Faerie Guidemother // Gift of the Fae",
  "Ardenvale Tactician // Dizzying Swoop"
]

if (decksInPage.length > 0) {
  decksInPage.each(function (i, deck) {
    $(deck).find("#deck-tab").append('<div style="background-color: #b122ae; border-color: #b122ae" class="tab-comprar export-to-arena">Exportar</div>')
    $(deck).find(".export-to-arena").on("click", () => promptDeck(deck))
  })
}

function promptDeck(deck) {
  var i = prompt("Digite 0 para exportar cartas em português ou 1 para inglês. [Default = Inglês]")
  if (i === "0") {
    downloadDeck(deck, "pt")
  } else {
    downloadDeck(deck, "en")
  }
}

function downloadDeck(deck, lang) {
  var mainLines = $($(deck).find(".pdeck-block").get(0))
  var sideLines = $($(deck).find(".pdeck-block").get(1))

  var main = []
  var side = []
  mainLines.find(".deck-card .sticky_lazy").each(function (i2, card) {
    var cardname = lang === "pt" ? $(card).text() : decodeURIComponent(card.href.match(/card\=(.*)/)[1]);
    if (adentureChecklist.indexOf(cardname) > -1) { cardname = cardname.match(/(.*)\/\//)[1] }
    main.push($(card).parent().parent().find(".deck-qty").text().trim() + " " + cardname)
  })
  sideLines.find(".deck-card .sticky_lazy").each(function (i2, card) {
    var cardname = lang === "pt" ? $(card).text() : decodeURIComponent(card.href.match(/card\=(.*)/)[1]);
    if (adentureChecklist.indexOf(cardname) > -1) { cardname = cardname.match(/(.*)\/\//)[1] }
    side.push($(card).parent().parent().find(".deck-qty").text().trim() + " " + cardname)
  })

  var _deckPaste = `Deck
${main.join("\n")}

Sideboard
${side.join("\n")}
`

  var textArea = document.createElement("textarea");
  textArea.value = _deckPaste;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
  alert("A lista foi copiada para sua área de transferência. Abra o arena e na área de decks, clique em 'Import'/'Importar'.")
}
