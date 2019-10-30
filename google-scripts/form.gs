function updateForm(){
  var formId = "formId";
  var nameListId = "listId";
  var goodsSheetName = "Goods";
  
  // call your form and connect to the drop-down item
  var form = FormApp.openById(formId);
  
  var namesList = form.getItemById(nameListId).asListItem();

// identify the sheet where the data resides needed to populate the drop-down
  var ss = SpreadsheetApp.getActive();
  var sName = ss.getName();
  var names = ss.getSheetByName(goodsSheetName);

  // grab the values in the first column of the sheet - use 2 to skip header row
  var namesValues = names.getRange(1, 2, names.getMaxRows() - 1).getValues();

  var goodsNames = [];

  // convert the array ignoring empty cells
  for(var i = 0; i < namesValues.length; i++)   
    if(namesValues[i][0] != "")
      goodsNames[i] = namesValues[i][0];

  // populate the drop-down with the array data
  namesList.setChoiceValues(goodsNames);
 
}

function updateSpreadsheet() {
  function selectLastElement(arr) {
    var i = 0; 
    for (i = 0; i < arr.length; i ++) {
      if (arr[i+1][0] == "") {
        break;
      }
    }
    return i;
  }
  var spreadsheetId = "sheetId"
  var answersSheetName = "answersSheetName"
  var goodsSheetName = "Goods";
  
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var answers = ss.getSheetByName(answersSheetName);
  var answerValues = answers.getRange(2, 1, answers.getMaxRows() - 1, 3).getValues();
  
  var last = selectLastElement(answerValues);
  var newItemName = answerValues[last][2];
  
  if (newItemName == "") {
    return;
  }
  
  // insert new item into Goods sheet
  var goods = ss.getSheetByName(goodsSheetName);
  var startRow = 1;
  var goodsValues = goods.getRange(startRow, 1, goods.getMaxRows() - 1).getValues();
  var last = selectLastElement(goodsValues);
  if (goodsValues[last][0] != newItemName){
    goods.getRange(startRow + last + 1, 1).setValue(newItemName);
  }
}
