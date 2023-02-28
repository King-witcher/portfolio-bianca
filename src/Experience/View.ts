type ViewResizeCallback = (instance: View) => void

export default class View {
    public readonly HTMLCanvas: HTMLCanvasElement
    public readonly rootDiv: HTMLDivElement
    public width: number
    public height: number
    public pixelRatio: number

    private callbacks: ViewResizeCallback[] = []

    constructor(
        rootDiv: HTMLDivElement
    ) {
        this.rootDiv = rootDiv

        const canvas = document.createElement('canvas') as HTMLCanvasElement
        canvas.width = rootDiv.clientWidth
        canvas.height = rootDiv.clientHeight
        rootDiv.appendChild(canvas)

        this.HTMLCanvas = canvas
        this.width = canvas.width
        this.height = canvas.height
        this.pixelRatio = window.devicePixelRatio

        const resizeObserver = new ResizeObserver(this.resize.bind(this))
        resizeObserver.observe(rootDiv)
    }

    public onResize(callback: ViewResizeCallback) {
        this.callbacks.push(callback)
    }

    private resize(entries: ResizeObserverEntry[]) {
        this.width = entries[0].contentRect.width
        this.height = entries[0].contentRect.height
        this.HTMLCanvas.width = this.width
        this.HTMLCanvas.height = this.height

        this.callbacks.forEach(callback => {
            callback(this)
        })
    }
}