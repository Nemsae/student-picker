$(document).ready(init)
var myArray = [];
var duplicateArray = [];

function init() {
  $('#add').click(addButtonClicked);
  $('#clear').click(clearList);
  $('#teamUp').click(makeTeams);
  $('#clear2').click(clearGroups);
  $('#randomPerson').click(randomPick);
}

function randomPick() {
  $('li').css('color', 'black')
  var listLength2 = $('ul#list li').length;
  var randomIndex = Math.floor(Math.random()*(listLength2));
  console.log('2: ',randomIndex);
  $(`li:eq( ${randomIndex} )`).css('color', 'red');
}

function clearGroups(){
  $('.temp').remove();

}

function clearList(){
  $('#list').empty();
}

function shuffle(array){
  for (var i=array.length-1;i>0;i--) {
    var j = Math.floor(Math.random()*(i+1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

function makeTeams(){
  console.log('duplicateArray: ',duplicateArray);
  console.log('myArray before: ',myArray);
  var shuffledArray = shuffle(myArray);

  var teamSize = $('#sizeInput').val();
  var listLength = $('ul#list li').length;

  var numberOfTeams = Math.floor(listLength/teamSize);
  var leftoverNumber = listLength%teamSize;
  var cleanNumber = listLength-leftoverNumber;

  if (leftoverNumber !== 0) {
    var geekCorner = [];
    for(var h=listLength-1;h>cleanNumber-1;h--) {
      var geeks = shuffledArray[h];
      geekCorner.push(geeks);
    }
    $('.group-box').append('<h3 class="temp geeky">The Geeks: '+geekCorner+'</h1>');
  } else {
    $('.group-box').append('<h3 class="temp">There are no geeks!</h1>');
  }

  for(var i=0;i<numberOfTeams;i++) {
    var newArray=[];

    for(var j=0;j<teamSize;j++) {
      var word = shuffledArray[j];
      newArray.push(word);
    }

    shuffledArray.splice(0,teamSize);
    //console.log('newArray: '+newArray);
    $('.group-box').append('<h3 class="temp">Clique#'+(i+1)+': '+newArray+'</h1>');

  }//for

}


function addButtonClicked(){
  //grab the name from input
  var name = $('#name').val();

  //if there are commas (multiple), split it
  if(name.indexOf(',') > -1) {
    //clear out input
    $('#name').val('');
    var nameArray = name.split(',');
    for(var i=0;i<nameArray.length;i++) {
      $("#list").append($('<li>').text(nameArray[i]))
      myArray.push(nameArray[i]);
    }
  } else {

    //clear out the input form
    $('#name').val('');

    var color = $('#color').val();

    var $li = $('<li>');
    //set the text of the list element as the name, and change it to corresponding color
    $li.text(name).css('color', color);
    $('#list').append($li);
    myArray.push(name);
  }

  duplicateArray = myArray.slice();
}
