function storageInfo() {
  var spreadsheetId = "spreadsheetId"
  var statsSheetName = "stShName"
  var answerSheetName = "ansShName"

  var s = SpreadsheetApp.openById(spreadsheetId);
  var statsSheet = s.getSheetByName(statsSheetName)
  var answerSheet = s.getSheetByName(answerSheetName)
  var values = answerSheet.getRange(2, 1, answerSheet.getMaxRows() - 1, 5).getValues()
//  statsSheet.deleteRows(1, statsSheet.getMaxRows() - 1)
  var amounts = {}
  for (var i = 0; i < values.length; i ++) {
    if (values[i][0] == "") {
      continue
    }
    var name = values[i][1] + values[i][2]
    if (name == "") {
      continue
    }
    if (!(name in amounts)) {
      amounts[name] = 0
    }
    var amount = values[i][4]
    switch(values[i][3]) {
      case "Bought":
        amounts[name] += amount
        break
      case "Used":
        amounts[name] -= amount
        break
      case "Run out":
        amounts[name] = 0
        break
      case "Rotten":
        amounts[name] = 0
        break
    }
  }
  
  var lastRow = 1
  for (var name in amounts) {
    statsSheet.getRange(lastRow, 1).setValue(name)
    statsSheet.getRange(lastRow, 2).setValue(amounts[name])
    lastRow += 1
  }
}
