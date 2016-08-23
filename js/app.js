var OneDayCalendar = function() { //using Module desgin pattern

  var renderDay = function(events) {
    var timeSlots = [];
    var eventsLength = events.length;
    var event;
    let i;
    let j;

    // Initialize an array of minutes that holds an array of the event occuring in the current minute. 
    for (i = 0; i < 720; i++) {
      timeSlots[i] = [];
    }

    //  prerpering events, assuming events array is sorted.
    for (i = 0; i < eventsLength; i++) {
      event = events[i];


      for (j = event.start; j < event.end; j++) {
        timeSlots[j].push(event.id);
      }
    }
    //  setting position - horizontal

    for (i = 0; i < 720; i++) {
      var next_hindex = 0; 
      var timeSlotLength = timeSlots[i].length;

      // if we've found a slot with an event running on it. will search for more events that chain with it.
      if (timeSlotLength > 0) {

        // Searching for the longest event in chain of events
        for (j = 0; j < timeSlotLength; j++) {
          event = events[timeSlots[i][j] -1];

          if (!event.currentChain || event.currentChain < timeSlotLength) {
            event.currentChain = timeSlotLength;


          
              event.hindex = next_hindex;

              next_hindex++;
            
          }
        }
      }
    }

    // Final calculation and rendering
    for (i = 0; i < events.length; i++) {
      event = events[i];


      event.xHeight = event.end - event.start;
      event.posY = event.start;

      event.xWidth = (600 / event.currentChain);


      event.posX = event.hindex * event.xWidth;

      /* setting poistion and size for each event as a div */
      var div = document.createElement("div");
      div.style.width = event.xWidth - 5 + "px"; // taking the border length in calculation(1px right, 4 px left )
      div.style.height = event.xHeight + "px";
      div.className = 'event';
      div.style.top = event.posY + "px";
      div.style.left = event.posX + "px";
          

      document.getElementById("day-calander").appendChild(div);
    }
  };


  return {
    renderDay: renderDay
  };

}();

