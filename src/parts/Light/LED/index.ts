class LED {

  public static info() {
    return {
      name: "LED",
    };
  }

  public keys: any;
  public requiredKeys: any;
  public obniz: any;
  public io_anode: any;
  public params: any;
  public io_cathode: any;
  public animationName: any;

  constructor() {
    this.keys = ["anode", "cathode"];
    this.requiredKeys = ["anode"];
  }

  public wired(obniz: any) {
    function getIO(io: any) {
      if (io && typeof io === "object") {
        if (typeof io.output === "function") {
          return io;
        }
      }
      return obniz.getIO(io);
    }

    this.obniz = obniz;
    this.io_anode = getIO(this.params.anode);
    this.io_anode.output(false);
    if (this.obniz.isValidIO(this.params.cathode)) {
      this.io_cathode = getIO(this.params.cathode);
      this.io_cathode.output(false);
    }
    this.animationName = "Led-" + this.params.anode;
  }

  public on() {
    this.endBlink();
    this.io_anode.output(true);
  }

  public off() {
    this.endBlink();
    this.io_anode.output(false);
  }

  public output(value: any) {
    if (value) {
      this.on();
    } else {
      this.off();
    }
  }

  public endBlink() {
    this.obniz.io.animation(this.animationName, "pause");
  }

  public blink(interval: any) {
    if (!interval) {
      interval = 100;
    }
    const frames: any = [
      {
        duration: interval,
        state: (index) => {
          // index = 0
          this.io_anode.output(true); // on
        },
      },
      {
        duration: interval,
        state: (index) => {
          // index = 0
          this.io_anode.output(false); // off
        },
      },
    ];

    this.obniz.io.animation(this.animationName, "loop", frames);
  }
}

if (typeof module === "object") {
  export default LED;
}
