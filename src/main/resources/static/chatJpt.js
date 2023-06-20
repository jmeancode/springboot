$(function() {
    var INDEX = 0;

    $("#chat-submit").click(function(e) {
        e.preventDefault();
        var msg = $("#chat-input").val();
        if (msg.trim() == '') {
            return false;
        }
        send_request(msg);
    });

    function send_request(message) {
        generate_message(message, 'self');
        $("#chat-input").val('').focus();
        $.ajax({
            url: '/gpt-api', // GPT API 엔드포인트 주소
            type: 'POST',
            dataType: 'json',
            data: {
                message: message
            },
            success: function(response) {
                var reply = response.reply;
                generate_message(reply, 'user');
            },
            error: function() {
                generate_message("Oops! Something went wrong.", 'user');
            }
        });
    }

    function generate_message(msg, type) {
        INDEX++;
        var str = "";
        str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + "\">";
        str += "  <span class=\"msg-avatar\">";
        str += "    <img src=\"https://cdn.pixabay.com/photo/2023/05/05/21/00/cute-7973191_1280.jpg\">";
        str += "  </span>";
        str += "  <div class=\"cm-msg-text\">";
        str += msg;
        str += "  </div>";
        str += "</div>";
        $(".chat-logs").append(str);
        $("#cm-msg-" + INDEX).hide().fadeIn(300);
        $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    }

    $("#chat-circle").click(function() {
        $("#chat-circle").toggle('scale');
        $(".chat-box").toggle('scale');
    });

    $(".chat-box-toggle").click(function() {
        $("#chat-circle").toggle('scale');
        $(".chat-box").toggle('scale');
    });
});
