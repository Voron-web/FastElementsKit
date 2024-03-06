class FEK_accordeon {
    constructor(baseElementClass, userOptions = {}) {

        this.defaultOptions = {
            titleBlockClass: '.fek-accordeon__title',
            contentBlockClass: '.fek-accordeon__content',
            indicator: {
                enable: true,
                type: 'arrow',
                customElement: '' //it is used if indicator.type == 'custom'
            },
        }

        this.options = this.createOptions(this.defaultOptions, userOptions)
        this.accordeon = document.querySelector(baseElementClass);
        this.accordeonItems = Array.from(this.accordeon.querySelectorAll('.fek-accordeon__item'))
        this.titleBlockClass = this.options.titleBlockClass
        this.contentBlockClass = this.options.contentBlockClass
        this.indicatorEnable = this.options.indicator.enable
        this.indicatorType = this.options.indicator.type
        this.indicatorClass = '.fek-accordeon__indicator'
        this.indicatorCustomClass = this.options.indicator.customElement

        this.indicatorImg = {
            arrow: `<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#0F0F0F" /></svg>`,
            triangular: `<svg fill="#000000"  id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path class="cls-1" d="M8,2L2,14H14L8,2Z"></path> </g></svg>`,
            cross: `<svg fill="none" width="40px" height="40px" viewBox="0 0 24.00 24.00" id="cross" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color" stroke="#000000" stroke-width="0.168" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.192"></g><g id="SVGRepo_iconCarrier"><path id="primary" d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" style="fill: #000000;"></path></g></svg>`
        }
        this.init()
    }

    createOptions(obj, userObj) {
        // console.log(Object.keys(userObj));
        if (Object.keys(userObj).length == 0) {
            const newObj = structuredClone(obj)
            return newObj
        }
        else {
            const newObj = {}
            for (let key in obj) {
                if (typeof obj[key] !== 'object') {
                    if (userObj[key] != undefined) {
                        newObj[key] = userObj[key]
                    }
                    else {
                        newObj[key] = obj[key]
                    }
                }
                else {
                    newObj[key] = this.createOptions(obj[key], userObj[key])
                }
            }
            return newObj
        }
    }


    init() {
        this.accordeonItems.forEach((item) => {
            const titleBlock = item.querySelector(this.titleBlockClass)
            titleBlock.classList.add('hidden')
            const wrapper = document.createElement('div')
            wrapper.classList.add('fek-accordeon__content-wrapper')
            wrapper.classList.add('hidden')
            wrapper.appendChild(item.querySelector(this.contentBlockClass))
            item.appendChild(wrapper)
            if (this.indicatorEnable) {
                if (this.indicatorType != 'custom') {
                    const indicator = document.createElement('div')
                    indicator.classList.add('fek-accordeon__indicator')
                    indicator.insertAdjacentHTML('afterbegin', this.indicatorImg[this.indicatorType])
                    titleBlock.appendChild(indicator)

                }
            }
        })

        this.accordeon.addEventListener('click', this.checkClick.bind(this))
    }

    checkClick(event) {
        if (event.target.classList.contains(this.titleBlockClass.replace('.', ''))) {
            event.target.classList.toggle('hidden')
            event.target.parentNode.querySelector('.fek-accordeon__content-wrapper').classList.toggle('hidden')
        }
    }

}




var accord = new FEK_accordeon('.accordeon', {

    indicator: {
        // enable: false,
        type: 'triangular'
    }
})