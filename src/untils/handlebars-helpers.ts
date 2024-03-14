import Handlebars from 'handlebars';

export function registerCustomHelpers() {
  Handlebars.registerHelper('add', function(value1, value2) {
    return value1 + value2;
  });

  Handlebars.registerHelper('subtract', function(value1, value2) {
    return value1 - value2;
  });

  Handlebars.registerHelper('multiply', function(value1, value2) {
    return value1 * value2;
  });

  Handlebars.registerHelper('divide', function(value1, value2) {
    return value1 / value2;
  });
}
