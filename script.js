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

console.clear();
function randomItem(d, c, b, a, s) {
    var x = '';
    if(SPity == 0 && s != 0)
        x = 's';
    else if(APity == 0 && a != 0)
        x = 'a';
    else if(BPity == 0 && b != 0) 
        x = 'b';
    else {
        var random = Math.floor(Math.random() * 100000)
        console.log(random)
        if(random < d)
            x = 'd';
        else if(d <= random && random < c)
            x = 'c';
        else if(c <= random && random < b)
            x = 'b';
        else if(b <= random && random < a)
            x = 'a';
        else if(a <= random && random < s)
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

function pullOne(essence) {
    //$(".btn-open-1").attr('disabled','disabled');
    var item;
    pulls++;
    SPity--;
    APity--;
    BPity--;
    $.getJSON(`${essence}.json`, function(data){
        var rand = randomItem(data.probs.d, data.probs.c, data.probs.b, data.probs.a, data.probs.s);
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
        updateText();
        console.log(item);
        //TODO: Switch category depending on item type. Read updated documentation for further info :)
        $.getJSON(`https://idv-costume.herokuapp.com/skin/${item}`, function(data) {
            if(document.contains(document.getElementById("skin")))
                document.getElementById("skin").remove();
            img = document.createElement('img');
            img.id = "skin";
            img.src = data.link;
            document.getElementById('body').appendChild(img);
        });
    })
}

function openAnim() {
    document.getElementById("btns-open").style.filter = "brightness(.3)";
    document.getElementById("essence").style.filter = "brightness(.3)";
}

function updateText() {
    $(".pulls").html(`Pulls: ${pulls}<br/>A Tiers: ${a}<br/>S Tiers: ${s}<br/>Pulls until guaranteed A Tier: ${APity}<br/>Pulls until guaranteed S Tier: ${SPity}`);
}