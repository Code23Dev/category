(function ($) {
  $(document).ready(function() {
    $('.multifilter-gallery-button').click(function(){
      var value = $(this).data('filter');
      if(value == 'all'){
        $('.multifilter-gallery-button').removeClass('active');
        $('.multifilter-gallery-button input[type="checkbox"]').prop('checked', false);
        $(this).addClass('active');
        $('.multifilter-gallery-box').show();
        $('.size-name').html(''+'');
        $('.color-name').html(''+'');
        $('.shape-name').html(''+'');
      }else{
        $('.multifilter-gallery-button[data-filter="all"]').removeClass('active');
        $('.multifilter-gallery-box').hide();
        if($(this).hasClass('active')){
          $(this).removeClass('active');
          $(this).find('input[type="checkbox"]').prop('checked', false);
        }else{
          $(this).addClass('active');
          $(this).find('input[type="checkbox"]').prop('checked', true);
        }
        var colors = $('.multifilter-gallery-button.color.active');
        var sizes = $('.multifilter-gallery-button.size.active');
        var shapes = $('.multifilter-gallery-button.shape.active');
        var colorsArray = $.map( colors, function( val, i ) {
          return $(val).data('filter');
        });
        var sizesArray = $.map( sizes, function( val, i ) {
          return $(val).data('filter');
        });
        var shapesArray = $.map( shapes, function( val, i ) {
          return $(val).data('filter');
        });
        
        var combinations = [];
        if(colorsArray.length > 0){
          var colorsTexts = $.map( colors, function( val, i ) {
            return $(val).text();
          });
          $('.color-name').html(''+colorsTexts.join(', '));
          combinations = colorsArray;
        }else{
          $('.color-name').html(''+'');
        }
        if(sizesArray.length > 0){
          var sizesTexts = $.map( sizes, function( val, i ) {
            return $(val).text();
          });
          $('.size-name').html(''+sizesTexts.join(','));
          if(combinations.length > 0){
            var tempCombinations = combinations;
            combinations = [];
            $.each($(tempCombinations), function(i, c){
              $.each($(sizesArray), function(ii, sz){
                var combination = [c, sz];
                combinations.push(combination);
              });
            });
          }else{
            combinations = sizesArray;
          }
        }else{
          $('.size-name').html(''+'');
        }
        if(shapesArray.length > 0){
          var shapesTexts = $.map( shapes, function( val, i ) {
            return $(val).text();
          });
          $('.shape-name').html(''+shapesTexts.join(', '));
          if(combinations.length > 0){
            var tempCombinations = combinations;
            combinations = [];
            $.each($(tempCombinations), function(i, c){
              if($.isArray(c)){
                $.each($(shapesArray), function(ii, s){
            var combination = $.merge([s], c);
            combinations.push(combination);
          });
              }else{
                $.each($(shapesArray), function(ii, s){
            var combination = [c, s];
            combinations.push(combination);
          });
              }
            });
          }else{
            combinations = shapesArray;
          }
        }else{
          $('.shape-name').html(''+'');
        }

        if(combinations.length > 0){
          $.each($(combinations), function(i, val){
            if($.isArray(val)){
              var classes = val.join('.');
                $('.multifilter-gallery-box'+'.'+classes).show();
            }else{
              $('.multifilter-gallery-box'+'.'+val).show();
            }
          });
        }else{
          $('.multifilter-gallery-button[data-filter="all"]').click();
        }

      }
     
    });

  })
})(jQuery);