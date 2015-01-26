"use strict";

$(document).ready(function () {


    var input = $("#username");
    var okLabel = $("#ok");
    var notOkLabel = $("#notOk");

    okLabel.hide();
    notOkLabel.hide();


    var keyupStream = input.keyupAsObservable();


    var valueStream = keyupStream
        .map(function (ev) {
            return $(ev.target).val();
        })
        .throttle(400)
        .distinctUntilChanged();

    var responseStream = valueStream.flatMapLatest(function(text){
        return requestUsername(text);
    });

    responseStream.map(function(resp){
        return resp.data;
    }).subscribe(function (inUse) {
        if(inUse){
            okLabel.hide();
            notOkLabel.show();
        }else{
            notOkLabel.hide();
            okLabel.show();
        }
    });


});

function requestUsername(name) {
    return $.ajaxAsObservable({
        url: '/username',
        data: {
            name: name
        },
        dataType: 'json'
    });
}


//
//// Stream mit SSE-Events für das aktuelle Match
//var sseStream = clickStream.flatMapLatest(function(){
//    return Rx.DOM.fromEventSource("/matches/" + matchIdInput.val() + "/event-stream");
//});
//
//// Stream mit Update-Messages vom SSE
//var sseUpdates = sseStream.filter(function (e){
//    return e.data == "update";
//});
//
//// Stream mit allen Events, die ein Update auslösen sollen
//var updateStream = clickStream.merge(sseUpdates);
//
//// Stream mit REST-Request-Strings für das aktuelle Match
//var requestUrlStream = updateStream.map(function(){
//    return "/matches/" + matchIdInput.val() + "/moves";
//});
//
//// Stream mit REST-Responses
//var responseStream = requestUrlStream.flatMap(function(url){
//    return $.ajaxAsObservable({
//        url: url
//    });
//});
//
//
//// Bei jeder neuen Response wird der HTML-DOM aktualisiert
//responseStream.subscribe(function(response){
//    historyList.empty();
//
//    $.each(response.data, function(_, entry) {
//        createListEntry(entry).appendTo(historyList);
//    })
//
//}, function(e) {
//    console.log(e);
//});
//
//
//var createListEntry = function(entry){
//    return  $("<li>" + entry.figure.color + " " + entry.figure.type
//    + " moved from (" + entry.from.column + ","  + entry.from.row
//    + ") to (" + entry.to.column + "," + entry.to.row
//    + ")</li>")
//};
//
