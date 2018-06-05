/* global define, KeyboardEvent, module */
(function () {
  var keyboardeventKeyPolyfill = {
    polyfill: polyfill,
    keys: {
      3: 'Cancel',
      6: 'Help',
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      28: 'Convert',
      29: 'NonConvert',
      30: 'Accept',
      31: 'ModeChange',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      41: 'Select',
      42: 'Print',
      43: 'Execute',
      44: 'PrintScreen',
      45: 'Insert',
      46: 'Delete',
      48: ['0', ')'],
      49: ['1', '!'],
      50: ['2', '@'],
      51: ['3', '#'],
      52: ['4', '$'],
      53: ['5', '%'],
      54: ['6', '^'],
      55: ['7', '&'],
      56: ['8', '*'],
      57: ['9', '('],
      91: 'OS',
      93: 'ContextMenu',
      106: '*',
      107: '+',
      109: '-',
      110: '.',
      111: '/',
      144: 'NumLock',
      145: 'ScrollLock',
      181: 'VolumeMute',
      182: 'VolumeDown',
      183: 'VolumeUp',
      186: [';', ':'],
      187: ['=', '+'],
      188: [',', '<'],
      189: ['-', '_'],
      190: ['.', '>'],
      191: ['/', '?'],
      192: ['`', '~'],
      219: ['[', '{'],
      220: ['\\', '|'],
      221: [']', '}'],
      222: ["'", '"'],
      224: 'Meta',
      225: 'AltGraph',
      246: 'Attn',
      247: 'CrSel',
      248: 'ExSel',
      249: 'EraseEof',
      250: 'Play',
      251: 'ZoomOut'
    }
  };

  // Function keys (F1-24).
  var i;
  for (i = 1; i < 25; i++) {
    keyboardeventKeyPolyfill.keys[111 + i] = 'F' + i;
  }

  // Printable ASCII characters.
  var letter = '';
  for (i = 65; i < 91; i++) {
    letter = String.fromCharCode(i);
    keyboardeventKeyPolyfill.keys[i] = [letter.toLowerCase(), letter.toUpperCase()];
  }

  // Numbers on numeric keyboard.
  for (i = 96; i < 106; i++) {
    letter = String.fromCharCode(i - 48);
    keyboardeventKeyPolyfill.keys[i] = letter;
  }

  function polyfill () {
    var isEdgeOrIE = (navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || navigator.userAgent.indexOf("Edge/") > 0);
    if (!('KeyboardEvent' in window) ||
        ('key' in KeyboardEvent.prototype && !isEdgeOrIE)) {
      return false;
    }

    // Polyfill `key` on `KeyboardEvent`.
    var proto = {
      get: function (x) {
        var key = keyboardeventKeyPolyfill.keys[this.which || this.keyCode];

        if (Array.isArray(key)) {
          key = key[+this.shiftKey];
        }

        return key;
      },
      enumerable: true,
      configurable: true
    };
    Object.defineProperty(KeyboardEvent.prototype, 'key', proto);
    return proto;
  }

  if (typeof define === 'function' && define.amd) {
    define('keyboardevent-key-polyfill', keyboardeventKeyPolyfill);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    module.exports = keyboardeventKeyPolyfill;
  } else if (window) {
    window.keyboardeventKeyPolyfill = keyboardeventKeyPolyfill;
  }

  keyboardeventKeyPolyfill.polyfill();

  String.prototype.strip = function(char) {
      return this.replace(new RegExp("^" + char + "*"), '').
          replace(new RegExp(char + "*$"), '');
  }

  $.extend_if_has = function(desc, source, array) {
      for (var i=array.length;i--;) {
          if (typeof source[array[i]] != 'undefined') {
              desc[array[i]] = source[array[i]];
          }
      }
      return desc;
  };

  (function($) {
      $.fn.console = function(eval, options) {
          if ($('body').data('console')) {
              return $('body').data('console').terminal;
          }
          this.addClass('tilda');
          options = options || {};
          eval = eval || function(command, term) {
              term.echo("you don't set eval for console");
          };
          var settings = {
              prompt: 'ninja> ',
              name: 'console',
              height: 150,
              enabled: false,
              greetings: 'Welcome to the ninja console!',
              keypress: function(e) {
                  if (e.which == 96) {
                      return false;
                  }
              }
          };
          if (options) {
              $.extend(settings, options);
          }
          this.append('<div class="td"></div>');
          var self = this;
          self.terminal = this.find('.td').terminal(eval, settings);
          var focus = false;
          $(document.documentElement).keypress(function(e) {
              if (e.which == 96) {
                  self.slideToggle('fast');
                  self.terminal.focus(focus = !focus);
                  self.terminal.attr({
                      scrollTop: self.terminal.attr("scrollHeight")
                  });
              }
          });
          $('body').data('console', this);
          this.hide();
          return self;
      };
  })(jQuery);

  function calculateDayOfYear() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  function calculateDaysInAYear() {
    return new Date().getFullYear() % 4 == 0 ? 366 : 365;
  }

  function fetchCyclingGoalData(rideData){
    var fillFunction = function(rideData) {
      var ytd = Math.round(rideData.ytd);
      var goal = rideData.goal;
      var totalPercent = Math.round(ytd / goal * 100);
      var ytdGoal = Math.round(goal / calculateDaysInAYear() * calculateDayOfYear());
      var ytdExpectedPacePercentage = Math.round(ytdGoal / goal * 100);
      var onTrackPercent = Math.round(ytd / ytdGoal * 100);

      var content = `
      <p>Year End Goal (${goal} miles)</p>
      <div class="w3-light-grey w3-round-xlarge" style="height:24px">
        <div class="pace-wrapper">
          <div class="w3-round-xlarge w3-center w3-blue" style="height:24px;width:${totalPercent}%">${totalPercent}%</div>
          <div class="pace-line" style="width:${ytdExpectedPacePercentage}%"></div>
        </div>
      </div>
      <p>Pace (${ytdGoal - ytd} miles behind pace)</p>
      <div class="w3-light-grey w3-round-xlarge" style="height:24px">
        <div class="w3-round-xlarge w3-center w3-blue" style="height:24px;width:${onTrackPercent}%">${ytd} mi / ${ytdGoal} mi</div>
      </div>
      `;
      $("#CyclingGoalContent").html(content);
    }

    $.ajax({
      url: "cycle",
      dataType: 'json',
      success: function(result) {
        fillFunction(result);
      },
      error: function() { alert('Failed!'); }
    });

  }

  function fetchStockPrice(quote) {
    var url = `stock/${quote}`;
    var selector = `[id=${quote}]`;

    var fillFunction = function(selector, price) {
      var content = `<i class="w3-text-black w3-margin-left fa fa-line-chart fa-fw"></i><b class="w3-margin-left">${price}</b>`
      $(selector).html(content);
    }

    $.ajax({
      url: url,
      dataType: 'json',
      success: function(result) {
        fillFunction(selector, `$${result.closing_price}`);
      },
      error: function() {
        fillFunction(selector, "N/A");
      }
    });
  }

  jQuery(document).ready(function($) {
      //power the Quake terminal ;)
      $('#console').console(function(command, terminal) {
          terminal.echo('you type command "' + command + '"');
      });

      //kick off some AJAX calls to fill in some dynamic data
      fetchCyclingGoalData();
      fetchStockPrice("aaxn");
      fetchStockPrice("msft");
      fetchStockPrice("bb");
  });
})();
