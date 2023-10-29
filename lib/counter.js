
let totalLastText = '$         ';
let remainLastText = '  :  :  ';
let countdownHandle = null;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  async function getDemoData() {
    const t = getRandomInt(1000050);
    const tOutput = ('         ' + t.toLocaleString().replace('.',','))
    
    let e = getRandomInt(1500);
    if (e > 1000) {
        e = 1000;
    }

    const eOutput = ('     ' + e.toLocaleString().replace('.',','))
    
    return {
      total: `${tOutput.slice(tOutput.length-9,tOutput.length)}`,
      earlyBirds: `${eOutput.slice(eOutput.length-5, eOutput.length)}`
    }
  }


  async function getData() {

    const url = 'https://booster.vitruveo.xyz/api/sale-counters';
    // {"success":true,"data":{"b2":0,"totalTokenDue":0,"b4":0,"totalSaleCounter":0,"b6":0,"b5":0,"b3":0,"totalEBCounter":0,"b1":0,"b7":0}} 

    let t = 0;
    let e = 0;

    const response = await fetch(url);
    const result = await response.json();
    t = result.totalSaleCounter;
    e = result.totalEBCounter;
    
    if (e > 1000) {
        e = 1000;
    }

    const tOutput = ('         ' + t.toLocaleString().replace('.',','))
    

    const eOutput = ('     ' + e.toLocaleString().replace('.',','))
    
    return {
      total: `${tOutput.slice(tOutput.length-9,tOutput.length)}`,
      earlyBirds: `${eOutput.slice(eOutput.length-5, eOutput.length)}`
    }
  }


async function renderCounter() {

    const g = DEMO === true ? await getDemoData() : await getData();
    
    let totalText = '$' + g.total;

    if (totalText !== totalLastText) {
        $('#Total')
            .splitFlap({
            image: '/lib/chars-45x60.png',
            imageSize: '',
            charsMap: ':$, 0123456789',
            charWidth: 45,
            charHeight: 60,
            speed: 8,
            speedVariation: 4,
            textInit: totalLastText,
            text: totalText
        });

        totalLastText = totalText;

    }

    $('#total-head').text(`Early Birds: ${g.earlyBirds}`);

}

function renderCountdown() {
    let curr = new Date().getTime();
    let diff = Math.trunc((LAUNCH - curr)/1000);
    if (diff >= 0) {
        const hours = Math.trunc(diff / 3600).toString().padStart(2, '0');
        const mins = Math.trunc((diff - (hours * 3600)) / 60).toString().padStart(2, '0');
        const secs = Math.trunc((diff - (hours * 3600) - (mins * 60))).toString().padStart(2, '0'); 


        let remainText = hours + ':' + mins + ':' + secs;

        $('#Remaining')
            .splitFlap({
            image: '/lib/chars-45x60.png',
            imageSize: '',
            charsMap: ':$, 0123456789',
            charWidth: 45,
            charHeight: 60,
            textInit: remainLastText,
            text: remainText
        });
    
        remainLastText = remainText;
    } else {
        clearInterval(countdownHandle);
        $('.countdown-container').hide();
        $('.counter-container').show();
        renderCounter();
        setInterval(() => {
            renderCounter();
        }, 10000);        
    }
}

function initialize() {
    const curr = new Date().getTime();
    const width = $(document).width()
    if (curr >= LAUNCH) {
        if (width > 640) {
            $('.countdown-container').hide();
            $('.counter-container').show();    
        } else {

        }
        renderCounter();
        setInterval(() => {
            renderCounter();
        }, 10000);        
    } else {
        $('.counter-container').hide();
        $('.countdown-container').show();
        countdownHandle = setInterval(() => {
            renderCountdown();
        }, 1000);
    }
}
initialize();
