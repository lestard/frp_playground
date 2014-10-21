
var contactsList = document.querySelector("#contacts");


var refreshButton = document.querySelector('#refresh');
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');


var requestStream = refreshClickStream.startWith("startup click")
  .map(function(){
    var randomOffset = Math.floor(Math.random()* 500);
    return "https://api.github.com/users?since=" + randomOffset;
  });

var responseStream = requestStream
  .flatMap(function(requestUrl) {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  })

var suggestion1Stream = responseStream
  .map(function(listUsers) {
    return listUsers[Math.floor(Math.random()*listUsers.length)];
  })
  .merge(
    refreshClickStream.map(function(){return null;})
  ).startWith(null);

responseStream.subscribe(function(response) {
  $("#contacts").empty();
  response.forEach(function(element){
    var li = $("<li>" + element.login + "</li>");
    li.appendTo("#contacts");
  });
});
