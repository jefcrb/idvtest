/*
Normal essence:
D tier: 32%
C tier: 50%
B tier: 10.2%, pity: 10
A tier: 38% per 30 pulls, pity: 60
=> 1.2891%
S tier: 25% per 100 pulls, pity: 250
=> 0.327124%
*/

var pulls = 0, b = 0, a = 0, s = 0, BPity = 10, APity = 60, SPity = 250;
var essence = "s18e2";

console.clear();
function randomItem() {
    var x = '';
    if(SPity == 0)
        x = 's';
    else if(APity == 0)
        x = 'a';
    else if(BPity == 0)
        x = 'b';
    else {
        var random = Math.floor(Math.random() * 100000)
        console.log(random)
        if(random < 32000)
            x = 'd';
        else if(32000 <= random && random < 82000)
            x = 'c';
        else if(82000 <= random && random < 92200)
            x = 'b';
        else if(92200 <= random && random < 93489)
            x = 'a';
        else if(93489 <= random && random < 93816)
            x = 's';
        else
            x = 'd';
    }
    return x;
}

function pullTen() {
    for(i = 0; i < 10; i++) {
        pullOne();
    }
}

function pullOne() {
    //$(".btn-open-1").attr('disabled','disabled');
    var item;
    pulls++;
    SPity--;
    APity--;
    BPity--;
    $.getJSON(`${essence}.json`, function(data){
        var rand = randomItem();
        console.log(rand);
        switch(rand) {
            case 'd':
                item = data.DTiers[Math.floor(Math.random() * data.DTiers.length)];
                break;
            case 'c':
                item = data.CTiers[Math.floor(Math.random() * data.CTiers.length)];
                break;
            case 'b':
                item = data.BTiers[Math.floor(Math.random() * data.BTiers.length)];
                b++;
                BPity = 10;
                break;
            case 'a':
                item = data.ATiers[Math.floor(Math.random() * data.ATiers.length)];
                a++;
                APity = 60;
                break;
            case 's':
                item = data.STiers[Math.floor(Math.random() * data.STiers.length)];
                s++;
                SPity = 250;
                break;
        }
        console.log(item);
        $.getJSON(`https://idv-costume.herokuapp.com/?name=${item}`, function(data) {
            if(document.contains(document.getElementById("skin")))
                document.getElementById("skin").remove();
            img = document.createElement('img');
            img.id = "skin";
            img.src = data.link;
            document.getElementById('body').appendChild(img);
        });
    })
    updateText();
}

function openAnim() {
    document.getElementById("btns-open").style.filter = "brightness(.3)";
    document.getElementById("essence").style.filter = "brightness(.3)";
}

function updateText() {
    $(".pulls").html(`Pulls: ${pulls}<br/>A Tiers: ${a}<br/>S Tiers: ${s}<br/>Pulls until guaranteed A Tier: ${APity}<br/>Pulls until guaranteed S Tier: ${SPity}`);
}