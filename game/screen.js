/**
 * Created by Sly on 13.02.2016.
 */
Screen.buffer = [];
Screen.target = document.getElementById("screen");
Screen.AddQue = function(content, delay) {
    (delay) || (delay = 50);
    Screen.buffer[Screen.buffer.length] = {"content": content, "delay": delay};
};

Screen.Next = function() {
    if (Screen.buffer.length <= 0) {
        setTimeout(Screen.Next, 50);
        return;
    }
    var line = Screen.buffer.reverse().pop();
    Screen.Write(line.content, line.delay);
    Screen.buffer.reverse();
};

Screen.Write = function(content, time) {
    Screen.target = document.getElementById("screen");
    time = typeof time !== 'undefined' ? time : 50;
    var i = 0;
    (function writeChar() {
        setTimeout(function() {
            if (i < content.length) {
                //Check for tags
                var char = content.charAt(i++);
                if (char == "<"){
                    //Add tag to div
                    var end = content.indexOf('>', i);
                    var tag = content.substring(i, end);

                    console.log(tag);

                    //Check for closing tag
                    if (tag.charAt(0) == "/") {
                        if (tag.substring(1).toUpperCase() == Screen.target.tagName) {
                            Screen.target = Screen.target.parentNode;
                        }
                    } else {
                        var element = document.createElement(tag.substring(0, tag.contains(" ") ? tag.indexOf(" ") : tag.length));

                        //Style element
                        if (tag.contains("style")) {
                            var style = tag.substring(tag.indexOf("style") + 7, tag.indexOf("'", tag.indexOf("style") + 7));
                            for (var prop in style.split(";")) {
                                element.style[style.split(";")[prop].split(": ")[0]] = style.split(";")[prop].split(": ")[1];
                            }
                        }

                        Screen.target.appendChild(element);

                        //brs don't need a closing tag
                        if (tag != "br") {
                            Screen.target = element;
                        }
                    }
                    i+= end - i + 1;
                } else {
                    Screen.target.innerHTML += char;
                }
                writeChar();
            } else {
                Screen.Next();
            }
        }, time);
    })();
};

Screen.ProcessInput = function(e) {
    //Enter was pressed
    if (e.keyCode == 13) {
        var text = document.getElementById("textInput").value;
        text = text.replace(/</g, "&lt").replace(/>/g, "&gt");
        Screen.target.innerHTML += ">" + text + "<br>";
        //Clear box
        document.getElementById("textInput").value = "";
    }
};