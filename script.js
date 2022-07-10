window.addEventListener('load', e => {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  document.body.appendChild(canvas);

  const control = document.createElement('div');
  control.style.position = 'absolute';
  control.style.display = 'flex';
  control.style.flexDirection = 'column';
  control.style.left = '10px';
  control.style.top = '10px';
  control.style.padding = '10px';
  control.style.backgroundColor = 'rgba(0, 0, 0, .5)';
  document.body.appendChild(control);

  const context = canvas.getContext('2d');

  const primes = [];
  const sieve = {};
  const checkPrime = n => {
    for (let i = 2; i <= n / 2; ++i) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  };
  setTimeout(f = (n = 2) => {
    if (typeof sieve[n] === 'undefined') {
      if (checkPrime(n)) {
        primes.push(n);
        sieve[n] = true;
      } else {
        sieve[n] = false;
      }
    }
    if (n < 10000) {
      setTimeout(f, 0, n + 1);
    }
  }, 0);
  
  let angle = 1;
  let gap = 1;

  const angleControl = document.createElement('input');
  angleControl.setAttribute('type', 'number');
  angleControl.value = angle;
  angleControl.addEventListener('change', e => {
    angle = parseInt(angleControl.value);
  });
  control.appendChild(angleControl);

  const gapControl = document.createElement('input');
  gapControl.setAttribute('type', 'number');
  gapControl.value = gap;
  gapControl.addEventListener('change', e => {
    gap = parseInt(gapControl.value);
  });
  control.appendChild(gapControl);

  requestAnimationFrame(update = () => {
    requestAnimationFrame(update);

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    context.clearRect(0, 0, width, height);

    for (let i = 0; i < 360 * 10; ++i) {
      if (sieve[i] === true) {
        const r = i * angle / 360 * 2 * Math.PI;
        const sin = Math.sin(r);
        const cos = Math.cos(r);
        const l = gap + gap * i * angle / 360;
        const x = l * cos;
        const y = l * sin;
        const px = width / 2 + x;
        const py = height / 2 - y;

        context.beginPath();
        context.arc(px, py, 2, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
      }
    }
  });
});
