/* ---- particles.js config ---- */

particlesJS('particles-js', {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 1000
            }
        },
        color: {
            value: ['#1E40AF', '#FACC15', '#0EA5E9', '#94A3B8']
        },
        shape: {
            type: ['circle', 'triangle'],
            stroke: {
                width: 0,
                color: '#fff'
            }
        },
        opacity: {
            value: 0.7,
            random: true,
            anim: {
                enable: true,
                speed: 0.8,
                opacity_min: 0.3,
                sync: false
            }
        },
        size: {
            value: 6,
            random: true,
            anim: {
                enable: true,
                speed: 1.5,
                size_min: 2,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 120,
            color: '#64748B',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse' // 🚀 Hace que se alejen cuando pasas el mouse
            },
            onclick: {
                enable: true,
                mode: 'bubble' // 🌟 Se agregan partículas de forma elegante al hacer clic
            }
        },
        modes: {
            repulse: {
                distance: 120, // 💨 Se alejan con suavidad
                duration: 0.5
            },
            bubble: {
                distance: 200, // 🌀 Pequeña expansión al hacer clic
                size: 8,
                duration: 0.5
            }
        }
    },
    retina_detect: true
});

// ---- EFECTO SUAVE DE AUMENTO TEMPORAL ----
document.addEventListener("click", function () {
    let particles = pJSDom[0].pJS.particles;
    let originalValue = particles.number.value;

    // Aumenta ligeramente el número de partículas
    particles.number.value += 5;
    pJSDom[0].pJS.fn.particlesRefresh();

    // Después de 1.5 segundos, vuelve a la cantidad original
    setTimeout(() => {
        particles.number.value = originalValue;
        pJSDom[0].pJS.fn.particlesRefresh();
    }, 1000);
});



const allElements = document.querySelectorAll('.animated-text');

// It checks if there is at least one element
if (allElements.length > 0) {
	//It runs the script for each found element
	allElements.forEach((element) => {
		const txtElement = element,
			wordsList = txtElement.getAttribute('data-words'),
			words = wordsList.split(', '); // It makes an array of words from data attribute

		let wordsCount = 0;

		entry();

		// Initial function
		function entry() {
			if (wordsCount < words.length) {
				// It runs the code for each word
				let word = words[wordsCount],
					txtArr = word.split(''), // It makes an array of letters in the word
					count = 0;

				txtElement.textContent = ''; // It removes the previous text from the element

				// For each letter in the array
				txtArr.forEach((letter) => {
					// It replaces the empty space for the "non-break-space" HTML...
					// ... This is needed to separate the words properly
					let _letter = letter === ' ' ? '&nbsp;' : letter;

					// It wraps every letter with a "span" and puts all they back to the element
					txtElement.innerHTML += `<span>${_letter}</span>`;
				});

				let spans = txtElement.childNodes;

				// It sets the interval between each letter showing
				const letterInterval = setInterval(activeLetter, 70);

				function activeLetter() {
					spans[count].classList.add('active');
					count++;

					if (count === spans.length) {
						clearInterval(letterInterval);

						// It waits 4 seconds to start erasing the word
						setTimeout(() => {
							eraseText();
						}, 600);
					}
				}

				function eraseText() {
					// It sets the interval between each letter hiding
					let removeInterval = setInterval(removeLetter, 40);
					count--;

					function removeLetter() {
						spans[count].classList.remove('active');
						count--;

						if (count === -1) {
							clearInterval(removeInterval);
							wordsCount++;

							// After removing the last letter, call the initial function again
							entry();
						}
					}
				}
			} else {
				// If the code reaches the last word
				// It resets the words counter...
				wordsCount = 0;
				// ...and calls the initial function again.
				entry();
			}
		}
	});
}