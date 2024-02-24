// Generated by CoffeeScript 1.12.7
(function() {
  'use strict';
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define([], function() {
        return root.i18n = factory();
      });
    } else if (typeof module === 'object' && module.exports) {
      return module.exports = factory();
    } else {
      return root.i18n = factory();
    }
  })((typeof self !== "undefined" && self !== null ? self : this), function() {
    var Translator, i18n, translator;
    Translator = (function() {
      function Translator() {
        this.translate = bind(this.translate, this);
        this.data = {
          values: {},
          contexts: []
        };
        this.globalContext = {};
      }

      Translator.prototype.translate = function(text, defaultNumOrFormatting, numOrFormattingOrContext, formattingOrContext, context) {
        var defaultText, formatting, isObject, num;
        if (context == null) {
          context = this.globalContext;
        }
        isObject = function(obj) {
          var type;
          type = typeof obj;
          return type === "function" || type === "object" && !!obj;
        };
        if (isObject(defaultNumOrFormatting)) {
          defaultText = null;
          num = null;
          formatting = defaultNumOrFormatting;
          context = numOrFormattingOrContext || this.globalContext;
        } else {
          if (typeof defaultNumOrFormatting === "number") {
            defaultText = null;
            num = defaultNumOrFormatting;
            formatting = numOrFormattingOrContext;
            context = formattingOrContext || this.globalContext;
          } else {
            defaultText = defaultNumOrFormatting;
            if (typeof numOrFormattingOrContext === "number") {
              num = numOrFormattingOrContext;
              formatting = formattingOrContext;
              context = context;
            } else {
              num = null;
              formatting = numOrFormattingOrContext;
              context = formattingOrContext || this.globalContext;
            }
          }
        }
        if (isObject(text)) {
          if (isObject(text['i18n'])) {
            text = text['i18n'];
          }
          return this.translateHash(text, context);
        } else {
          return this.translateText(text, num, formatting, context, defaultText);
        }
      };

      Translator.prototype.add = function(d) {
        var c, i, k, len, ref, ref1, results, v;
        if ((d.values != null)) {
          ref = d.values;
          for (k in ref) {
            v = ref[k];
            this.data.values[k] = v;
          }
        }
        if ((d.contexts != null)) {
          ref1 = d.contexts;
          results = [];
          for (i = 0, len = ref1.length; i < len; i++) {
            c = ref1[i];
            results.push(this.data.contexts.push(c));
          }
          return results;
        }
      };

      Translator.prototype.setContext = function(key, value) {
        return this.globalContext[key] = value;
      };

      Translator.prototype.extend = function(ext) {
        return this.extension = ext;
      };

      Translator.prototype.clearContext = function(key) {
        return this.globalContext[key] = null;
      };

      Translator.prototype.reset = function() {
        this.resetData();
        return this.resetContext();
      };

      Translator.prototype.resetData = function() {
        return this.data = {
          values: {},
          contexts: []
        };
      };

      Translator.prototype.resetContext = function() {
        return this.globalContext = {};
      };

      Translator.prototype.translateHash = function(hash, context) {
        var k, v;
        for (k in hash) {
          v = hash[k];
          if (typeof v === "string") {
            hash[k] = this.translateText(v, null, null, context);
          }
        }
        return hash;
      };

      Translator.prototype.translateText = function(text, num, formatting, context, defaultText) {
        var contextData, result;
        if (context == null) {
          context = this.globalContext;
        }
        if (this.data == null) {
          return this.useOriginalText(defaultText || text, num, formatting);
        }
        contextData = this.getContextData(this.data, context);
        if (contextData != null) {
          result = this.findTranslation(text, num, formatting, contextData.values, defaultText);
        }
        if (result == null) {
          result = this.findTranslation(text, num, formatting, this.data.values, defaultText);
        }
        if (result == null) {
          return this.useOriginalText(defaultText || text, num, formatting);
        }
        return result;
      };

      Translator.prototype.findTranslation = function(text, num, formatting, data, defaultText) {
        var a, b, c, d, e, i, len, result, self, triple, value;
        value = data[text];
        if (value == null) {
          return null;
        }
        if (typeof value === "object" && !Array.isArray(value)) {
          if (this.extension && typeof this.extension === "function") {
            value = this.extension(text, num, formatting, value);
            if (value instanceof Promise) {
              self = this;
              return value.then(function(v) {
                return self.applyNumbers(v, num);
              }).then(function(v) {
                return self.applyFormatting(v, num, formatting);
              });
            } else {
              value = this.applyNumbers(value, num);
              return this.applyFormatting(value, num, formatting);
            }
          } else {
            return this.useOriginalText(defaultText || text, num, formatting);
          }
        }
        if ((num == null) && !Array.isArray(value)) {
          if (typeof value === "string") {
            return this.applyFormatting(value, num, formatting);
          }
        } else {
          if (value instanceof Array || value.length) {
            a = num === null;
            for (i = 0, len = value.length; i < len; i++) {
              triple = value[i];
              b = triple[0] === null;
              c = triple[1] === null;
              d = num >= triple[0];
              e = num <= triple[1];
              if (a && b && c || !a && (!b && d && (c || e) || b && !c && e)) {
                result = this.applyFormatting(triple[2].replace("-%n", String(-num)), num, formatting);
                return this.applyFormatting(result.replace("%n", String(num)), num, formatting);
              }
            }
          }
        }
        return null;
      };

      Translator.prototype.applyNumbers = function(str, num) {
        str = str.replace("-%n", String(-num));
        str = str.replace("%n", String(num));
        return str;
      };

      Translator.prototype.getContextData = function(data, context) {
        var c, equal, i, key, len, ref, ref1, value;
        if (data.contexts == null) {
          return null;
        }
        ref = data.contexts;
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          equal = true;
          ref1 = c.matches;
          for (key in ref1) {
            value = ref1[key];
            equal = equal && value === context[key];
          }
          if (equal) {
            return c;
          }
        }
        return null;
      };

      Translator.prototype.useOriginalText = function(text, num, formatting) {
        if (num == null) {
          return this.applyFormatting(text, num, formatting);
        }
        return this.applyFormatting(text.replace("%n", String(num)), num, formatting);
      };

      Translator.prototype.applyFormatting = function(text, num, formatting) {
        var ind, regex;
        for (ind in formatting) {
          regex = new RegExp("%{" + ind + "}", "g");
          text = text.replace(regex, formatting[ind]);
        }
        return text;
      };

      return Translator;

    })();
    translator = new Translator();
    i18n = translator.translate;
    i18n.translator = translator;
    i18n.create = function(data) {
      var trans;
      trans = new Translator();
      if (data != null) {
        trans.add(data);
      }
      trans.translate.create = i18n.create;
      trans.translate.translator = trans;
      trans.translate.extend = function(extension) {
        return trans.extend(extension);
      };
      return trans.translate;
    };
    return i18n;
  });

}).call(this);
