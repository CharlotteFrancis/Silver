// Card Class
class Card {
  constructor(name, set, rarity, grace, valor, charm, mystique, ferocity) {
      this.name = name
      this.set = set
      this.rarity = rarity
      this.grace = grace
      this.valor = valor
      this.charm = charm
      this.mystique = mystique
      this.ferocity = ferocity
    }
}

//List of Cards
const cardList = []

//Code to get data from sheet
function handleGoogleSheetData(data) {
  const values = data.values;
  const dataContainer = document.getElementById('data');

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

          if (row[4] != "None") {
            cardList.push({
              name: row[0],
              set: row[1],
              rarity: row[3],
              grace: row[4],
              valor: row[5],
              charm: row[6],
              mystique: row[7],
              ferocity: row[8],
            })
          }
      });
      // dataContainer.appendChild(table);
  } else {
      // dataContainer.textContent = 'No data found.';
      Console.log('No data found.')
  }

  //test
  cardList.sort((a, b) => b.charm - a.charm)
  console.log(cardList[1])
}

function fetchGoogleSheetData() {
  const apiKey = API_KEY // API key
  const spreadsheetId = '1il95C-Ic0tvQA-x98Kj6MiqyyVCLOyarppX6t7FFCWM' // spreadsheet ID
  const sheetName = 'data_file' // sheet name
  const range = 'A1:I1457' // Replace with the range you want to read

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${range}?key=${apiKey}&callback=handleGoogleSheetData`

  // Create a script element to load the Google Sheets data
  const script = document.createElement('script')
  script.src = url;

  // Append the script element to the document
  document.body.appendChild(script)
}

// Fetch Google Sheets data when the page loads
window.onload = fetchGoogleSheetData;