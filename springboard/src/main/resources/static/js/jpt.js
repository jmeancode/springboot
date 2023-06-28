$(function() {
    var INDEX = 0;
    $("#chat-submit").click(function(e) {
        e.preventDefault();
        var msg = $("#chat-input").val();
        if(msg.trim() == ''){
            return false;
        }
        generate_message(msg, 'self');
        var buttons = [
            {
                name: 'Existing User',
                value: 'existing'
            },
            {
                name: 'New User',
                value: 'new'
            }
        ];
        setTimeout(function() {
            generate_message(msg, 'user');
        }, 1000)

    })

    function generate_message(msg, type) {
        INDEX++;
        var str="";
        str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
        str += "          <span class=\"msg-avatar\">";
        str += "            <img src=\"https://cdn.pixabay.com/photo/2023/05/05/21/00/cute-7973191_1280.jpg\">";
        str += "          <\/span>";
        str += "          <div class=\"cm-msg-text\">";
        str += msg;
        str += "          <\/div>";
        str += "        <\/div>";
        $(".chat-logs").append(str);
        $("#cm-msg-"+INDEX).hide().fadeIn(300);
        if(type == 'self'){
            $("#chat-input").val('');
        }
        $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
    }

    function generate_button_message(msg, buttons){
        /* Buttons should be object array
          [
            {
              name: 'Existing User',
              value: 'existing'
            },
            {
              name: 'New User',
              value: 'new'
            }
          ]
        */
        INDEX++;
        var btn_obj = buttons.map(function(button) {
            return  "              <li class=\"button\"><a href=\"javascript:;\" class=\"btn btn-primary chat-btn\" chat-value=\""+button.value+"\">"+button.name+"<\/a><\/li>";
        }).join('');
        var str="";
        str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg user\">";
        str += "          <span class=\"msg-avatar\">";
        str += "            <img src=\"https://post-phinf.pstatic.net/MjAxOTEwMThfMTgx/MDAxNTcxMzk0OTk4MDQw.Wass8TXh8g1aCjJSYaZmzqYYAJYE7LP5LauXGBRPekIg.RKsKSQvW_cx44AiZE_LLONEwG3-eW7SYOJ8fW_Ipu1kg.JPEG/3.jpg?type=w800_q75\">";

        str += "          <\/span>";
        str += "          <div class=\"cm-msg-text\">";
        str += msg;
        str += "          <\/div>";
        str += "          <div class=\"cm-msg-button\">";
        str += "            <ul>";
        str += btn_obj;
        str += "            <\/ul>";
        str += "          <\/div>";
        str += "        <\/div>";
        $(".chat-logs").append(str);
        $("#cm-msg-"+INDEX).hide().fadeIn(300);
        $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
        $("#chat-input").attr("disabled", true);
    }

    $(document).delegate(".chat-btn", "click", function() {
        var value = $(this).attr("chat-value");
        var name = $(this).html();
        $("#chat-input").attr("disabled", false);
        generate_message(name, 'self');
    })

    $("#chat-circle").click(function() {
        $("#chat-circle").toggle('scale');
        $(".chat-box").toggle('scale');
    })

    $(".chat-box-toggle").click(function() {
        $("#chat-circle").toggle('scale');
        $(".chat-box").toggle('scale');
    })

})