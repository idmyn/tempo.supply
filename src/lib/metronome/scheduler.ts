// https://glitch.com/edit/#!/metronomes
// https://github.com/Tonejs/Tone.js/blob/f724be916e1c18be77e47f7133f00dabb1160d73/Tone/core/context/Context.ts#L609
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques#playing_the_audio_in_time

export class AudioScheduler {
  lookaheadMs: number;
  scheduleAheadSeconds: number;

  tempo: number;

  nextBeatDueAt: number;

  context: AudioContext;

  timerId: number;

  constructor() {
    this.scheduleAheadSeconds = 0.1;
    this.tempo = 120;
    this.context = new AudioContext();
    this.scheduler = this.scheduler.bind(this);
  }

  start(callbackFn: () => void) {
    if (this.context.state === "suspended") {
      this.context.resume();
    }
    this.scheduler(callbackFn);
  }

  stop() {
    clearTimeout(this.timerId);
    this.nextBeatDueAt = undefined;
  }

  scheduler(callbackFn: () => void) {
    const secondsPerBeat = 60.0 / this.tempo;

    if (this.nextBeatDueAt === undefined) {
      // don't play the first beat because it sounds too close to the second
      this.nextBeatDueAt = this.context.currentTime + secondsPerBeat;
    }

    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer
    while (
      this.nextBeatDueAt <
      this.context.currentTime + this.scheduleAheadSeconds
    ) {
      callbackFn();
      this.nextBeatDueAt += secondsPerBeat;
    }

    this.timerId = setTimeout(
      () => this.scheduler(callbackFn),
      this.lookaheadMs
    );
  }
}
