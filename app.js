    var isVisible = true;
    function hideInfo() {
        thePlace1 = document.getElementById('deviceInformation');
        thePlace3 = document.getElementById('hideButton');
        if (isVisible) {
            thePlace1.classList.add('hidden');
            thePlace3.innerHTML = 'show';
            isVisible = false;
        } else {
            thePlace1.classList.remove('hidden');
            thePlace3.innerHTML = 'hide';
            isVisible = true;
        }
    }
    function getDeviceInfo() {
        information = 'cordova: ' + device.cordova + "<br />" +
                        'model: ' + device.model + "<br />" +
                        'platform: ' + device.platform + "<br />" +
                        'uuid: ' + device.uuid + "<br />" +
                        'version: ' + device.version + "<br />";

        document.getElementById('deviceInformation').innerHTML = information;
    }

    function onSuccess(contacts) {
        //alert('Found ' + contacts.length + ' contacts.');
        document.getElementById('contactInformation').innerHTML = JSON.stringify(contacts, null, 4);
    };
    //
    function onError(contactError) {
        alert('onError!');
    };
    //
    // Wait for PhoneGap to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);
    //
    function onDeviceReady() {
        if (device.platform === "iOS") {
            //alert("got iOS");
            // hide Exit button. They don't have one on iOS devices.
            // http://www.mzcart.com/javascript-how-to-addremove-css-class-from-a-dom-element/
            document.getElementById('exitApp').classList.add("hidden");
            /* deals with post-iOS-7 change that covers the status bar */
            /* http://coenraets.org/blog/2013/09/phonegap-and-cordova-with-ios-7/ */
            document.body.style.marginTop = "20px";
        } else if (device.platform == 'Android') {
            // Get rid of 300ms delay 
            document.addEventListener('DOMContentLoaded', function() { FastClick.attach(document.body); }, false);
            document.getElementById('exitApp').addEventListener('click', function () {
                navigator.app.exitApp();
            });
        }
        document.getElementById('hideButton').addEventListener('click', function () {
           hideInfo();
        });
        //
        getDeviceInfo();

        // find all contacts with 'me' in any name field
        var options      = new ContactFindOptions();
        options.filter   = "";
        options.multiple = true;
        //options.desiredFields = [navigator.contacts.fieldType.id];
        var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
        navigator.contacts.find(fields, onSuccess, onError, options);
    }
