import Mixin from '@ember/object/mixin';

export default Mixin.create({
  // @ts-ignore
  onInit: (context: any) => {},

  init() {
    this._super(...arguments);

    if (this.onInit) {
      this.onInit(this);
    }
  }
});
