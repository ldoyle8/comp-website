document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'interaction', 'dayGrid', 'list', 'googleCalendar' ],
    defaultView: 'dayGridMonth',
    header: {
      center: 'addEventButton',
      left: 'prev,next today',
      right: 'dayGridMonth,listYear'
    },
    displayEventTime: false, // don't show the time column in list view


    googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',

    // Irish Holidays
    events: 'en.irish#holiday@group.v.calendar.google.com',

    eventClick: function(arg) {
      // opens events in a popup window
      window.open(arg.event.url, 'google-calendar-event', 'width=700,height=600');

      arg.jsEvent.preventDefault() // don't navigate in main tab
    },

    loading: function(bool) {
      document.getElementById('loading').style.display =
        bool ? 'block' : 'none';
    },

    customButtons: {
      addEventButton: {
        text: 'add event...',
        click: function() {
          var dateStr = prompt('Enter a date in YYYY-MM-DD format');
          var date = new Date(dateStr + 'T00:00:00'); // will be in local time
          var titleStr = prompt('Enter event title')
          var title = '' + titleStr
          if (!isNaN(date.valueOf())) { // valid?
            calendar.addEvent({
              title: title,
              start: date,
              allDay: true
            });
            alert('Your Event Has Been Added');
          } else {
            alert('Invalid date.');
          }
        }
      }
    }
  });

  // calendar( ‘renderEvent’, event [, true ] )
  calendar.render(true);
});
