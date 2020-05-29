let stream = {};

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('../sw.js')
      .then(() => console.log('Registered service worker'))
      .catch((error) => console.log('Error register service worker ', error));
  }
}

registerServiceWorker();

async function getMedia() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoElem = document.querySelector('#me');
    videoElem.srcObject = stream;
    videoElem.addEventListener('loadedmetadata', () => {
      videoElem.play();
    })
    console.log(stream);
  } catch (error) {
      console.log(error);
  };
};

async function captureImage(stream) {
  const mediaTrack = stream.getVideoTracks()[0];
  const captureImg = new ImageCapture(mediaTrack);
  const photo = await captureImg.takePhoto()
  const imgUrl = URL.createObjectURL(photo);
  document.querySelector('#photo').src = imgUrl;
};

document.querySelector('#takePhoto').addEventListener('click', event => {
  captureImage(stream);
  document.querySelector('#photo').classList.add('screenshot');
  document.querySelector('#wrap').classList.remove('hide');
  document.querySelector('#reset').classList.remove('hide');
});

document.addEventListener('click', e => {
  if(e.target.classList.contains('filterbutton')) {
    if(e.target.classList.contains('brightness-add')) {
      Caman('#photo', function() {
        this.brightness(10).render();
      });
    } else if(e.target.classList.contains('brightness-remove')) {
      Caman('#photo', function() {
        this.brightness(-10).render();
      });
    } else if(e.target.classList.contains('saturation-add')) {
      Caman('#photo', function() {
        this.saturation(10).render();
      });
    } else if(e.target.classList.contains('saturation-remove')) {
      Caman('#photo', function() {
        this.saturation(-10).render();
      });
    } else if(e.target.classList.contains('contrast-add')) {
      Caman('#photo', function() {
        this.contrast(10).render();
      });
    } else if(e.target.classList.contains('contrast-remove')) {
      Caman('#photo', function() {
        this.contrast(-10).render();
      });
    } else if(e.target.classList.contains('vibrance-add')) {
      Caman('#photo', function() {
        this.vibrance(10).render();
      });
    } else if(e.target.classList.contains('vibrance-remove')) {
      Caman('#photo', function() {
        this.vibrance(-10).render();
      });
    }
  }
});

function removeFilter() {
  Caman('#photo', function () {
    this.revert()
  });
}

document.querySelector('#reset').addEventListener('click', () => {
  removeFilter();
});

getMedia();