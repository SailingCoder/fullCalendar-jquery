(function($) {
  $('#calendar').fullCalendar({
      header: {
          right: 'prev,next today',
          center: 'title',
          left: 'month,agendaWeek,agendaDay'
      },
      monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      today: ["今天"],
      firstDay: 1,
      buttonText: {
          today: '今天',
          month: '月',
          week: '周',
          day: '日',
          prev: '上一月',
          next: '下一月'
      },
      theme: true,
      editable: false, //日历项拖拽
      allDaySlot: false,
      events: function(start, end, callback) { //生成日历
          //alert(calendar.fullCalendar('getDate'));
          var events = [];
          $.ajax({
              'url': "$!{rc.contextPath}/duty/dutyScheduling/canlendarModel?time=" + new Date().getTime(),
              'data': {
                  timeStart: $.fullCalendar.formatDate(start, "yyyy-MM-dd HH:mm:ss"),
                  timeEnd: $.fullCalendar.formatDate(end, "yyyy-MM-dd HH:mm:ss")
              },
              'dataType': 'json',
              'type': 'post',
              'error': function(data) {
                  alert("保存失败");
                  return false;
              },
              'success': function(doc) {
                  $(doc).each(function(i) {
                      events.push({
                          title: 'Daily Scrum meeting'
                      });
                  });
                  callback(events);
              }
          });

      },
      dayClick: function(date, allDay, jsEvent, view) { // 单机日历内空白 新增事件
          console.log('date', date)
          console.log('allDay', allDay)
          console.log('jsEvent', jsEvent)
          console.log('view', view)
      },
      timeFormat: 'HH:mm{ - HH:mm}',
      eventClick: function(event) { // 单机日历内已有事件
          var tempStart = $.fullCalendar.formatDate(event.start, "yyyy/MM/dd");
          var tempEnd = $.fullCalendar.formatDate(event.end, "yyyy/MM/dd");
          if(tempStart == tempEnd) { //若在同一天，结束日期省略
              var fstart = $.fullCalendar.formatDate(event.start, "yyyy/MM/dd HH:mm");
              var fend = $.fullCalendar.formatDate(event.end, "HH:mm");
          } else {
              var fstart = $.fullCalendar.formatDate(event.start, "yyyy/MM/dd HH:mm");
              var fend = $.fullCalendar.formatDate(event.end, "yyyy/MM/dd HH:mm");
          }
      }
  });
})(jquery)
