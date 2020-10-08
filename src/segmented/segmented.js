Component({
    externalClasses: ["ex-class"],
    options: {
        styleIsolation: "apply-shared",
        pureDataPattern: /^_/
    },
    /**
     * Component properties
     */
    properties: {
        values: {
            type: Array,
            value: []
        },
        initValue: {
            type: String,
            value: ""
        },
        scrollable: {
            type: Boolean,
            value: false
        },
        theme: {
            type: String,
            value: "ios12"
        },
        exStyle: {
            type: String,
            value: ""
        }
    },

    /**
     * Component initial data
     */
    data: {
        _scrollLeft: 0,
        current: 0,
        highlightLeft: 0,
        highlightWidth: 100
    },

    /**
     * Component methods
     */
    methods: {
        onScroll: function (e) {
            // console.debug(e.detail);
            this.setData({ _scrollLeft: e.detail.scrollLeft })
        },
        onTap: function (e) {
            let index = parseInt(e.target.dataset.index);
            if (this.data.current !== index) {
                //渲染滑块位置
                this.renderHighlight(index, true, 200);
            }
        },
        renderHighlight: function (current = 0, makeEvent = false, timespan = 200) {
            let _this = this;
            let { values, _scrollLeft } = this.data;

            if (values && values.length > 0 && values[current]) {
                setTimeout(function () {
                    // 延时获取线的宽度和左边距离
                    const query = _this.createSelectorQuery();
                    query.select('#sc-' + current).boundingClientRect();
                    query.select(".segmented-control").boundingClientRect();
                    query.exec(function (res) {
                        // console.debug(res)
                        let itemLeft = res[0].left, itemWidth = res[0].width, offsetLeft = res[1].left;
                        _this.setData({ current: current, highlightLeft: itemLeft - offsetLeft + _scrollLeft, highlightWidth: itemWidth });

                        if (makeEvent) {
                            _this.triggerEvent("click", { index: current, value: values[current] });
                        }
                    });
                }, timespan);
            }
        }
    },
    lifetimes: {
        ready: function () {
            let { values, initValue } = this.properties;
            let cur = values.findIndex(v => v == initValue);

            if (cur < 0) cur = 0;

            //初始化滑块位置
            this.renderHighlight(cur, false, 500);
        }
    }
});