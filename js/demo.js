var drawingLineObj = {
    cavs:$('.cavs'),
    context:$('.cavs').get(0).getContext('2d'),
    colorBoard:$('#colorBoard'),
    // cleanBoard:$('#cleanBoard'),
    // eraser:$('#eraser'),
    // rescind:$('#rescind'),
    lineRuler:$('#lineRuler'),
    bool:false,
    arrImg:[],
    init:function(){
        this.context.lineCap = 'round'; //线条起始和结尾样式
        this.context.lineJoin = 'round'; //转弯
        this.draw();
        this.btnFn();
    },
    draw:function(){
        var cavs = this.cavs,
            self = this;
        var c_x = cavs.offset().left;
            c_y = cavs.offset().top;

    
            cavs.mousedown(function(e){
                self.bool = true;
                var m_x = e.pageX - c_x;
                    m_y = e.pageY - c_y;
                    self.context.beginPath();
                    self.context.moveTo(m_x,m_y);

                    cavs.mousemove(function(e){
                        // self.bool = false;
                        if(self.bool){
                            self.context.lineTo(e.pageX-c_x,e.pageY-c_y);
                            self.context.stroke();
                        }
                    })
                    cavs.mouseup(function(){
                        self.context.closePath();
                        self.bool = false;
                    })
                    cavs.mouseleave(function(){
                        self.context.closePath();
                        self.bool = false;
                    })
                    
                    var imgData = self.context.getImageData(0,0,self.cavs[0].width,self.cavs[0].height);
                    self.arrImg.push(imgData);
                    // console.log(self.arrImg);
            })
    },
    btnFn:function(){
        var self = this;
        $('.btn-list').on('click',function(e){
              e = e || window.event;
              switch(e.target.id){
                  case 'cleanBoard':
                  self.context.clearRect(0,0,self.cavs[0].width,self.cavs[0].height);
                  break
                  case 'eraser':
                  self.context.strokeStyle = "#fff";
                  break
                  case 'rescind':
                  if(self.arrImg.length>0){
                    self.context.putImageData(self.arrImg.pop(),0,0);
                  }
                  break
              }
        })
        this.colorBoard.change(function(){//当颜色变化时，字体颜色变化
            self.context.strokeStyle = $(this).val();
        })
        this.lineRuler.change(function(){
            self.context.lineWidth = $(this).val();
        })
    }
}

drawingLineObj.init();