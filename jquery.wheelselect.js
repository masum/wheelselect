$.fn.extend({
  wheelselect: function(param) {
    var $this = this;
    var $list = ""
    var $num = 5;
    var $center = Math.ceil($num/2);
    var $current = 0;
    var $items = new Array();
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
        $list.push(idxArray[(pos-$center)+i]);
      }
      $current = idx;
    };
    var css_top = ["0px","8px","18px","35px","50px"];
    var css_left = ["0px","10px","20px","10px","0px"];
    var css_size = ["0.6em","0.8em","1em","0.8em","0.6em"]
    var css_color = ["#ddd","#aaa","#000","#aaa","#ddd"];
    var makecss = function(i) {
      return {"top":css_top[i],"left":css_left[i],"display":"",
              "fontSize":css_size[i],"color":css_color[i]};
    }
    var createItem =  function(item) {
      var div = $("<div class='wlist' style='position:absolute;font-size:12px;cursor:pointer'>");
      div.text(item.name)
         .attr("alt",item.value)
         .bind("click",function(e) {
            param.onselect($(e.target).attr("alt"));
          });
      div.hide();
      return div;
    }
    var showList = function() {
      for (var i=0;i<$num;i++) {
        $items[$list[i]].css(makecss(i)).show();
      }   
    };
    var animeList = function() {
      for (var i=0;i<$num;i++) {
        $items[$list[i]].show().animate(makecss(i),100);
      }   
    };
    var down = function() {
      var index = ($current==0)?param.list.length-1:$current-1;
      makeList(index);
      $(".wlist").hide();
      animeList();
    };
    var up = function() {
      var index = ($current>param.list.length)?0:$current+1;
      makeList(index);
      $(".wlist").hide();
      animeList();
    };
    $this.bind("DOMMouseScroll",function(e) {
      var d = e.detail;
      if (d > 0) {
        down();
      } else {
        up();
      }
    });
    for (i in param.list) {
      $items[i] = createItem(param.list[i],i).hide().appendTo($this);
    }
    makeList(1);
    showList();
  }
});
