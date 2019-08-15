
const defaultEventParam = {
  sent_to: null,
  event_category: 'default_event_category',
  event_label: 'default_event_label',
  value: 1,
};

const condition = (conditions) => {
  return !!((typeof navigator !== 'undefined' || typeof window !== 'undefined')
    && !(navigator.doNotTrack === '1' || window.doNotTrack === '1')
    && typeof window.gtag !== 'undefined'
    && conditions);
};

module.exports = {
  sendTo: (recipient) => {
    defaultEventParam.sent_to = recipient;
  },
  tag: (command, commandParameters) => {
    if (condition(typeof commandParameters !== 'undefined')) {
      window.gtag(command, commandParameters);
    }
  },
  set: (parameters = null) => {
    /*
    * gtag('set', {'method': 'Google'});
    * */
    if (condition(parameters)) {
      window.gtag('set', parameters);
    }
  },
  event: (eventName, eventParams = null) => {
    /*
    * Event Name:
    * - page_view,
    * - screen_view {screen_name},
    * - share {method, content_type, content_id} like {'Google', 'article', ''article-8704'},
    * https://developers.google.com/gtagjs/reference/event
    * https://developers.google.com/gtagjs/reference/parameter
    * gtag('event', 'login', {'method': 'Google'});
    * gtag('event', 'share');
    * */
    if (condition(eventName && eventParams)) {
      window.gtag('event', eventName, {
        ...defaultEventParam,
        ...eventParams,
      });
    } else if (condition(eventName)) {
      window.gtag('event', eventName);
    }
  },
};
