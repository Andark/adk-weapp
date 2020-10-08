// ans/lib/tag/tag.js
Component({
  externalClasses: ["ex-class"],
  options: {
    styleIsolation: "apply-shared",
  },
  /**
   * Component properties
   */
  properties: {
    size: {
      type: String,
      value: "default",
    },
    color: {
      type: String,
      value: 0,
      observer: function (newVal, oldVal) {
        if (newVal) {
          this.setData({ colorClass: "ans-tag-" + newVal });
        }
      },
    },
    closable: {
      type: Boolean,
      value: false,
    },
    checkable: {
      type: Boolean,
      value: false,
    },
    checked: {
      type: Boolean,
      value: false,
    },
    value: {
      type: String,
      value: "",
    },
    exData: {
      type: Object,
      value: null,
    },
    exStyle: {
      type: String,
      value: "",
    },
    checkedClass: {
      type: String,
      value: "checked",
    },
  },

  /**
   * Component initial data
   */
  data: {
    colorClass: "ans-tag-default",
    colorStyle: "",
    actived: false,
  },

  /**
   * Component methods
   */
  methods: {
    onClose() {
      this.triggerEvent("closed", {
        value: this.properties.value,
        data: this.properties.exData,
      });
    },
    onTap() {
      if (this.properties.checkable) {
        this.triggerEvent("checked", {
          checked: !this.properties.checked,
          value: this.properties.value,
          data: this.properties.exData,
        });
      }
    },
  },
});
