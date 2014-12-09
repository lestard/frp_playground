
var historyList = document.querySelector("#history");

var matchIdStream = $("#matchid")
  .keyupAsObservable()
  .map(function(ev){
      return $(ev.target).val();
   })
  .filter( function (text) {
    return text.length >= 10 // length of schachzwo-matchids
  })
  .throttle(500 /* ms */)
  .distinctUntilChanged();

//
// matchIdStream.subscribe(function(matchId){
//   console.log("matchID:");
//   console.log(matchId);
// });


var requestStream = matchIdStream.flatMapLatest(function(matchId){
  return "http://localhost/rest/matches/" + matchId + "/moves";
});

// var responseStream = matchIdStream.flatMapLatest(function(matchId){
//   return $.ajaxAsObservable({
//     url:"http://schachzwo.inf.hszg.de/matches/" + matchId + "/moves"
//   });
// });
//
// responseStream.subscribe(function(data){
//   console.log("result:");
//   console.log(data);
// });


//


//
// var requestStream = refreshClickStream.startWith("startup click")
//   .map(function(){
//     return "http"
//     var randomOffset = Math.floor(Math.random()* 500);
//     return "https://api.github.com/users?since=" + randomOffset;
//   });
//
// var responseStream = requestStream
//   .flatMap(function(requestUrl) {
//     return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
//   })
//
// var suggestion1Stream = responseStream
//   .map(function(listUsers) {
//     return listUsers[Math.floor(Math.random()*listUsers.length)];
//   })
//   .merge(
//     refreshClickStream.map(function(){return null;})
//   ).startWith(null);
//
// responseStream.subscribe(function(response) {
//   $("#contacts").empty();
//   response.forEach(function(element){
//     var li = $("<li>" + element.login + "</li>");
//     li.appendTo("#contacts");
//   });
// });
