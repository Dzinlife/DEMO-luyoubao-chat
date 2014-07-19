$(document).ready(function() {
	FastClick.attach(document.body);
	$.fx.interval = 16;
	$(".toolbar").on("touchmove", function(e){
		e.preventDefault()
	})


	var menuOpened;
	$(".toolbar-btn .container").click(function() {
		thisIndex = $(this).parent().index();
		if (menuOpened) {
			if($(".action-menu").eq(thisIndex)[0] == menuOpened[0]){
				transitions.fadeOut(menuOpened);
				menuOpened = null;
				$(".toolbar-btn-highlight").removeClass("toolbar-btn-highlight");
			}else{
				transitions.fadeOut(menuOpened);
				menuOpened = $(".action-menu").eq(thisIndex);
				$(".toolbar-btn-highlight").removeClass("toolbar-btn-highlight");
				transitions.moveFadeIn(menuOpened);
				$(".toolbar-btn .container").eq(thisIndex).addClass("toolbar-btn-highlight");
			}
		}else{
			menuOpened = $(".action-menu").eq(thisIndex);
			transitions.moveFadeIn(menuOpened)
			$(".toolbar-btn .container").eq(thisIndex).addClass("toolbar-btn-highlight");
		}		

	})

	$(".menu-cell").click(function() {
		transitions.fadeOut(menuOpened);
		menuOpened = null;
		$(".toolbar-btn-highlight").removeClass("toolbar-btn-highlight");
		reply($(this).data("action"));
		scrollToBottom();

	})


	function reply(action) {

		$(".scroll-content").trigger("newMessage");

		var $reply = $(".template").find(".chat-device").clone().appendTo($(".scroll-content"));
		transitions.moveFadeIn($reply, {"move": "200px", "duration": 800});

		if (action == "traffic") {
			$reply.find(".title").text("流量");
			$reply.find(".content").html("上传：50kB/s <br> 下载：200kB/s");
			$("<div class='action'>查看流量详情</div>").appendTo($reply);

		}else if (action == "devices"){
			$reply.find(".title").text("设备连接");
			$reply.find(".content").text("当前连接了8个无线设备，2个有线设备。");
			$("<div class='action'>查看设备详情</div>").appendTo($reply);

		}else if (action == "wifi"){
			$reply.find(".title").text("Wi-Fi设置");
			$reply.find(".content").html("网络名称：modou-DZ <br> 登陆密码：12345678");
			$("<div class='action'>设置无线网络</div>").appendTo($reply);

		}else if (action == "wan"){
			$reply.find(".title").text("互联网设置");
			$reply.find(".content").html("当前互联网连接正常");
			$("<div class='action'>互联网设置</div>").appendTo($reply);

		}else if (action == "lan"){
			$reply.find(".title").text("局域网设置");
			$reply.find(".content").html("当前有2个设备通过局域网连接路由器。");
			$("<div class='action'>局域网设置</div>").appendTo($reply);

		}else if (action == "reboot"){
			$reply.find(".title").text("重启");
			$reply.find(".content").html("重启路由器将短暂断开网络连接，确定要重启吗?");
			$("<div class='action yes'>是的，我要重启路由器</div>").appendTo($reply);
			$("<div class='action no'>取消</div>").appendTo($reply);

			$reply.find(".yes").one("click", function() {
				$reply.find(".yes").css({
					"-webkit-font-smoothing": "subpixel-antialiased",
					"font-weight": "bold",
					"box-shadow" : "none",
					"padding" : "0",
					"background-color": "transparent",
					"transition" : "0.3s ease-out",
				})
				$reply.find(".yes").html("“" + $reply.find(".yes").html() + "”");
				var offsetLeft = $reply.find(".yes").offset().left;
				var textMoveDistance = $reply.width() - $reply.find(".yes").width();
				$reply.find(".yes").css({
					"transform" : "translate3d(" + textMoveDistance + "px,0,0)",
					
				})
				$reply.find(".no").width(function() {
					return $(this).width();
				}).css({
					"position": "absolute",
					"bottom": "-38px",
					"left": "55px",
				}).fadeOut();

				if ($(".scroll-container").scrollTop() + $(".scroll-container").outerHeight() - $(".scroll-content").outerHeight() < 0 || $(".scroll-container").outerHeight() - $(".scroll-content").outerHeight() > -20) {
					$reply.nextAll().css({
						"transition": "0s",
						"transform": "translate3d(0,38px,0)"
					})
					setTimeout(function() {
						$reply.nextAll().css({
							"transition": "0.3s ease-out",
							"transform": "translate3d(0,0,0)"
						})
					})
				}else{
					$reply.prevAll().andSelf().css({
						"transition": "0s",
						"transform": "translate3d(0,-38px,0)"
					})
					setTimeout(function() {
						$reply.prevAll().andSelf().css({
							"transition": "0.3s ease-out",
							"transform": "translate3d(0,0,0)"
						})
					})
				}

				
			}) 

		}else if (action == "upgrade"){
			$reply.find(".title").text("系统升级");
			$reply.find(".content").html("检查到新版本固件8.9.6.4。");
			$("<div class='action yes'>立即升级</div>").appendTo($reply);
			
			$reply.find(".yes").one("click", function() {
				$reply.find(".yes").css({
					"-webkit-font-smoothing": "subpixel-antialiased",
					"font-weight": "bold",
					"box-shadow" : "none",
					"padding" : "0",
					"background-color": "transparent",
					"transition" : "0.3s ease-out",
				})
				$reply.find(".yes").html("“" + $reply.find(".yes").html() + "”");
				var offsetLeft = $reply.find(".yes").offset().left;
				var textMoveDistance = $reply.width() - $reply.find(".yes").width();
				$reply.find(".yes").css({
					"transform" : "translate3d(" + textMoveDistance + "px,0,0)",
					
				})
			}) 
		}

	}

	$(".scroll-content").on("newMessage", function() {
		// $(".scroll-content").find(".chat-device:last-child").css({
		// 	"position": "absolute",
		// }).fadeOut();
	})

	function scrollToBottom() {
		var scrollBottomOffset = $(".scroll-content").outerHeight() - $(".scroll-container").outerHeight();
		$(".scroll-container").animate({
			"scrollTop": scrollBottomOffset,
		},300,"swing",function() {
			// alert()
		})
	}


	var transitions = {
		moveFadeIn : function (elem, option) {
			if (option == undefined) {
				var option = {};
			}

			duration = option.duration || transitions.duration;
			move = option.move || "200px";

			elem.css({
				"display" : "block",
				"transform": "translate3d(0," + move + ",0)",
				"opacity"	:"0",
				"transition" : "0"
			});

			setTimeout(function () {
				elem.css({
					"opacity"	:"1",
					"transform": "translate3d(0,0,0)",
					"transition" : "all " + duration + "ms cubic-bezier(0.19, 1, 0.22, 1)"
				});
			})

			elem.off(transitions.end);
		},
		slideOut: function (elem, if_remove) {
			elem.css({
				"transform": "translate3d(100%,0,0)",
				"transition": "0.3s ease-out",
				"opacity"	:0,
			});

			if (if_remove == true) {
				setTimeout(function () {
					elem.remove();
				},300)	
			};
		},

		fadeIn :  function (elem) {
			elem.css({
				"opacity": "0",
				"transition":"0"
			});

			setTimeout(function () {
				elem.css({
					"opacity": "1",
					"transition" : "all 600ms cubic-bezier(0.19, 1, 0.22, 1)"
				});
			})
		},

		fadeOut : function (elem, if_remove) {
			elem.css({
				"opacity": "0",
				"transition" : "all " + transitions.duration + "ms cubic-bezier(0.19, 1, 0.22, 1)"
			});

			elem.one(transitions.end, function() {
				if (if_remove == true) {
					elem.remove();
				}else{
					elem.css({
						"display": "none",
					});
					elem.off(transitions.end)
				}
			})

			
		},
		duration : 600,
		end : "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
	}

})