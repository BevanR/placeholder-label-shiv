/**
 * @file
 * A shiv for the HTML5 placeholder="" attribute.
 *
 * @author Bevan Rudge
 * @see https://github.com/bevanr/placeholder-label-shiv
 */

jQuery.fn.placeholderLabelShiv = function() {
  // For each element in the jQuery object.
  this.each(function() {
    /*
     * Get or build jQuery objects for the elements.
     */
    var $element = jQuery(this);
    var $label = jQuery('<label class="placeholder-shiv" for="' + this.id + '">' + $element.attr('placeholder') + '</label>');

    // Style CSS the label so it has the correct layout, look and feel.
    var op = $element.offsetParent().offset();
    var ot = $element.offset();

    $label.css({
      'width': $element.width(),
      'left': ot.left - op.left,
      'top': ot.top - op.top + ($element.outerHeight() - $element.height()) / 2
    });

    // IE7-8 does not handle 'font-size' well.  Maybe because of
    // http://bugs.jquery.com/ticket/6783?
    // Firefox does not handle 'line-height' correctly.
    // @todo Make this list configurable?
    jQuery.each(['text-align', 'font-family', 'font-weight', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left'], function(i, property) {
      $label.css(property, $element.css(property));
    });

    /*
     * Modify and add elements to the DOM.
     */
    $element.removeAttr('placeholder').addClass('placeholder-shiv').before($label);

    /*
     * Bind to events.
     */

    // When focus is gained;
    $element.focus(function() {
      // Always hide the label when the <input> gets focus.
      $label.hide();
    });

    // When focus is lost;
    $element.blur(function() {
      // Show/hide the <label> respective of whether <input value=""> is empty.
      if (jQuery.trim($element.val()).length > 0) {
        $label.hide();
      }
      else {
        $label.show();
      }
    });

    /*
     * Initialize.
     */
    $element.blur();
  });
};
