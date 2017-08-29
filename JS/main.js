

//DOM Cache
var $birthDay = document.getElementById('bday');
var $submitBday = document.getElementById('submit-bday');
var $starData;

$submitBday.addEventListener('click', calcDays);


var dateInfo = {
  birthday: '',
  oneDay: 24*60*60*1000,
  today: new Date(),
  parsec: 0
}

function calcDays() {
  dateInfo.birthday = new Date($birthDay.value);
  console.log(dateInfo);
  var daysBtwn = Math.round(Math.abs((dateInfo.today.getTime() - dateInfo.birthday.getTime())/(dateInfo.oneDay)));

  //console.log($birthDay.value);
  console.log('Days since Birth Day: ' + daysBtwn);
  convertToParsec();

    function convertToParsec() {
      dateInfo.parsec = daysBtwn * 0.00083942886227647;
      console.log('Parsecs since Birth Day: ' + dateInfo.parsec);
      testLoop();
    }
};

var dayCalc = {
  today: new Date(),
  birthday: ''
}

function testLoop() {
  var oneLightDay = 0.00419714;
  var upperBound = parseInt(dateInfo.parsec) + (oneLightDay * 20);
  var lowerBound = parseInt(dateInfo.parsec) - (oneLightDay * 20);

  for (var i = 0; i < $starData.length; i++) {
    if ($starData[i].dist > lowerBound && $starData[i].dist < upperBound) {
      console.log('between ' + lowerBound + ' and ' + upperBound + ' parsecs:');
      console.log('Star ID:' + $starData[i].id);
    }
  }
}


function parseData() {
  Papa.parse("../Data/hygdata_v3.csv", {
    download: true,
    header: true,
  	complete: function(results) {
  		//console.log("Finished:", results.data);
      $starData = results.data;
      console.log($starData);
  	}
  });

}

parseData();
