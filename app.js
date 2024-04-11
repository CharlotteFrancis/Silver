// Card Class
class Card {
  constructor(name, set, rarity, grace, valor, charm, mystique, ferocity, overall) {
      this.name = name
      this.set = set
      this.rarity = rarity
      this.grace = grace
      this.valor = valor
      this.charm = charm
      this.mystique = mystique
      this.ferocity = ferocity
      this.overall = overall
    }
}

//List of Cards
const cardList = []

function test() {

  sortCharm()

  for(let i = 0; i < 50; i++) {
    cardList.shift()
  }
  sortValor()
  output()
}

function output() {
  const dataContainer = document.getElementById('data')
  const table = document.createElement('table')

  if (cardList.length >= 50) {
      for(let i = 0; i < 50; i++) {
        console.log(cardList[i])

        const tr = document.createElement('tr')

        const td = document.createElement('td')
        td.textContent = " "
        const tdName = document.createElement('td')
        const tdSet = document.createElement('td')
        const tdRarity = document.createElement('td')

        tdName.textContent = cardList[i].name
        tr.appendChild(tdName)
        tr.appendChild(td)
        tdSet.textContent = cardList[i].set
        tr.appendChild(tdSet)
        tr.appendChild(td)
        tdRarity.textContent = cardList[i].rarity
        tr.appendChild(tdRarity)
        tr.appendChild(td)

        table.appendChild(tr)
    
        dataContainer.appendChild(table);
      }
  } else {
    dataContainer.textContent = 'Not enough data found.'
  }
}

function sortOverall() {
  cardList.sort((a, b) => b.overall - a.overall)
}

function sortGrace() {
  cardList.sort((a, b) => b.grace - a.grace)
}

function sortValor() {
  cardList.sort((a, b) => b.valor - a.valor)
}

function sortCharm() {
  cardList.sort((a, b) => b.charm - a.charm)
}

function sortMystique() {
  cardList.sort((a, b) => b.mystique - a.mystique)
}

function sortFerocity() {
  cardList.sort((a, b) => b.ferocity - a.ferocity)
}

//Code to get data from sheet
function handleGoogleSheetData(data) {
  const values = data.values;
  // const dataContainer = document.getElementById('data');

  console.log(values)

  //manipulate values here.

  if (values && values.length > 0) {
      // const table = document.createElement('table');
      values.forEach(row => {
          // const tr = document.createElement('tr');
          // row.forEach(cell => {
              // const td = document.createElement('td');
              // td.textContent = cell;
              // tr.appendChild(td);
          // });
          // table.appendChild(tr);

          if (row[4] != "None" && row[0] != "Name") {

            for (let i = 0; i < parseInt(row[9]); i++) {
              cardList.push({
                name: row[0],
                set: row[1],
                rarity: row[3],
                grace: parseInt(row[4]),
                valor: parseInt(row[5]),
                charm: parseInt(row[6]),
                mystique: parseInt(row[7]),
                ferocity: parseInt(row[8]),
                overall: parseInt(row[4]) + parseInt(row[5]) + parseInt(row[6]) + parseInt(row[7]) + parseInt(row[8])
              })
            }
          }
      });

      // dataContainer.appendChild(table);

      test()
  } else {
      // dataContainer.textContent = 'No data found.';
      Console.log('No data found.')
  }
}

function fetchGoogleSheetData() {
  const apiKey = API_KEY // API key
  const spreadsheetId = '1il95C-Ic0tvQA-x98Kj6MiqyyVCLOyarppX6t7FFCWM' // spreadsheet ID
  const sheetName = 'data_file' // sheet name
  const range = 'A1:J1457' // Replace with the range you want to read

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${range}?key=${apiKey}&callback=handleGoogleSheetData`

  // Create a script element to load the Google Sheets data
  const script = document.createElement('script')
  script.src = url;

  // Append the script element to the document
  document.body.appendChild(script)
}

// Fetch Google Sheets data when the page loads
window.onload = fetchGoogleSheetData