$.fn.extend({
  wheelselect: function(param) {
    var $this = this;
    var $list = ""
    var $num = 5;
    var $center = Math.ceil($num/2);
    var $current = 0;
    $this.css("position","relative");
    $this.css("height","68px");
    var makeList = function(idx) {
      $list = [];
      idxArray = new Array();
      for (var n=0;n<3;n++) {
        for (var i=0;i<param.list.length;i++) {
          idxArray.push(i);
        }
      }
      pos = idx + param.list.length +1;
      for (var i=0;i<$num;i++) {
        var p = idxArray[(pos-$center)+i];
        $list.push(param.list[p]);
      }
      $current = idx;
    };
    var css_top = ["0px","8px","18px","35px","50px"];
    var css_left = ["0px","10px","20px","10px","0px"];
    var css_size = ["0.6em","0.8em","1em","0.8em","0.6em"]
    var css_color = ["#ddd","#aaa","#000","#aaa","#ddd"];
    var makecss = function(i) {
      return {"top":css_top[i],"left":css_left[i],
              "fontSize":css_size[i],"color":css_color[i]};
    }
    var createItem =  function(item,i) {
      var div = $("<div class='wlist' style='position:absolute;font-size:12px;cursor:pointer'>");
      return div.text($list[i].name)
         .attr("alt",$list[i].value)
         .css(makecss(i))
         .bind("click",function(e) {
            param.onselect($(e.target).attr("alt"));
          });
    }
    var showList = function() {
      for (i in $list) {
        createItem($list[i],i).appendTo("#container");
      }   
    };
    var down = function() {
      var index = ($current==0)?param.list.length-1:$current-1;
      makeList(index);
      $(".wlist").each(function(n,v) {
        if (n==($num-1)) {
          $(v).remove();
        }else{
          //$(v).animate(makecss(n+1),300);
          $(v).css(makecss(n+1));
        }
      });
      createItem($list[index],0).insertBefore($(".wlist")[0]);
    };
    var up = function() {
      var index = ($current>param.list.length)?0:$current+1;
      makeList(index);
      $(".wlist").each(function(n,v) {
        if (n==0) {
          $(v).remove();
        }else{
          //$(v).animate(makecss(n-1),300);
          $(v).css(makecss(n-1));
        }
      });
      createItem($list[index],4).appendTo("#container");
    };
    $this.bind("DOMMouseScroll",function(e) {
      var d = e.detail;
      if (d > 0) {
        down();
      } else {
        up();
      }
    });
    makeList(2);
    showList();
  }
});
