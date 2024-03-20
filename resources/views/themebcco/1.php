<style>
    #hide_catfish {text-align:center; font-size: 12px; font-weight: bold;}
    #hide_catfish a {background: #ebb10d; padding: 5px 32px; color: #000;}
</style>
<div class="float-ck-center-lt" style="position:fixed;bottom:0px;width:100%;text-align:center;z-index:999;">
    <div id="hide_catfish"><a rel="nofollow" href="javascript:hide_catfish();">Tắt QC</a></div>
    <div id="catfish_content" style="display:none;">
             <a rel="nofollow" href="https://67777.tv/#/home?code=437T6P" target="_blank">
            <img width="628" height="60" style="width:100%;max-width:628px;height:auto;" src="https://i.imgur.com/vIhImQK.gif" class="i999" /></a>
            <a rel="nofollow" href="https://67777.tv/#/home?code=437T6P" target="_blank">
            <img width="628" height="60" style="width:100%;max-width:628px;height:auto;" src="https://i.imgur.com/vIhImQK.gif" class="i999" /></a>

        </div>
</div>
<script type="text/javascript">
    // Lấy giá trị của cookie có tên "display_count"
    var displayCount = parseInt(getCookie("display_count")) || 0;

    // Nếu cookie "display_count" chưa đạt 2 lần, hiển thị nội dung và tăng giá trị cookie
    if (displayCount < 2) {
        document.getElementById("catfish_content").style.display = "block";
        document.getElementById("hide_catfish").innerHTML = '<a rel="nofollow" href="javascript:hide_catfish()">Tắt QC</a>';
        // Tăng giá trị cookie "display_count" lên 1
        setCookie("display_count", displayCount + 1, 2);
    }

    function hide_catfish() {
        var content = document.getElementById('catfish_content');
        var hide = document.getElementById('hide_catfish');
        if (content.style.display == "none") {
            content.style.display = "block";
            hide.innerHTML = '<a rel="nofollow" href="javascript:hide_catfish()">Hiện QC</a>';
        } else {
            content.style.display = "none";
            hide.innerHTML = '<a rel="nofollow" href="javascript:hide_catfish()">Quảng Cáo</a>';
        }
    }

    // Hàm để đặt cookie
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    // Hàm để lấy giá trị của cookie
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
</script>