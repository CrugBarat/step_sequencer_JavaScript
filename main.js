document.documentElement.addEventListener('mousedown', () => {
  if (Tone.context.state !== 'running') Tone.context.resume();
});

const synths = [
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth()
];

synths.forEach(synth => synth.toMaster());

const rows = document.body.querySelectorAll('div > div');
const notes = ['C4', 'B3', 'A3', 'G3', 'F3', 'E3', 'D3', 'C3'];
let index = 0;

function repeat(time) {
  let step = index % 8;
  for (let i = 0; i < rows.length; i++) {
    let synth = synths[i];
    let note = notes[i];
    let row = rows[i];
    let input = row.querySelector(`input:nth-child(${step + 1})`);
    if (input.checked) synth.triggerAttackRelease(note, '8n', time);
  }
  index++;
}

Tone.Transport.scheduleRepeat(repeat, '8n');
Tone.Transport.start();
