const { setMissingMethod } = require('../../../common/response');

/* https://tools.ietf.org/html/rfc2518#section-8.6 */
module.exports = function (options) {
  const exec = async function (ctx, calendar) {
    if (calendar.readonly) {
      setMissingMethod(ctx);
      return;
    }

    //
    // if event id not specified this indicates we're deleting
    // an entire calendar so we need to delete all events for it as well in this logic
    //
    if (ctx.state.params.eventId) {
      await options.data.deleteEvent(ctx, {
        eventId: ctx.state.params.eventId,
        principalId: ctx.state.params.principalId,
        calendarId: ctx.state.params.calendarId,
        user: ctx.state.user,
        calendar
      });
    } else {
      await options.data.deleteCalendar(ctx, {
        principalId: ctx.state.params.principalId,
        calendarId: ctx.state.params.calendarId,
        user: ctx.state.user,
        calendar
      });
    }

    ctx.status = 200;
    ctx.body = '';
  };

  return {
    exec
  };
};
