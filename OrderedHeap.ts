class OrderedHeap<T>{
    
    inOrder: (parent: T, child: T) => boolean;
    heap = [null] as T[];    

    constructor(inOrder: (parent: T, child: T) => boolean){
        this.inOrder = inOrder;
    }

    get size() {
        return this.heap.length - 1;
    }
    
    peek(){
        if (this.size === 0){
            return null;
        }
        
        return this.heap[1];
    }

    //bubble up
    add(val: T){
        
        this.heap.push(val);
        
        let curr = this.heap.length - 1;
        let parent = Math.floor(curr/2);
        
        while (curr > 1 && !this.inOrder(this.heap[parent], this.heap[curr])){
            //console.log(this.heap);
            [this.heap[curr], this.heap[parent]] = [this.heap[parent], this.heap[curr]];
            //console.log(this.heap);
            curr = parent;
            parent = Math.floor(curr/2);
        }
    }
    
    //remove value on top and push down new value
    replace(val: T): T{
        this.heap.push(val);
        
        if (this.size === 1) {
           return null;
        }
        
        return this.pop();
    }
   
    pop(): T{
        
        if (this.size === 0){
            return null;
        }
        
        if (this.size === 1){
            return this.heap.pop();
        }
        
        const removed = this.heap[1];
        this.heap[1] = this.heap.pop();
                
        let curr = 1;
        
        while (curr * 2 < this.heap.length){
            
            const li = curr*2;
            const ri = li+1;
            const l = this.heap[li];
            const r = ri < this.heap.length ? this.heap[ri] : null;
            
            const candidate = (r === null) || this.inOrder(l , r)
                ? l
                : r;
            
            if (this.inOrder(this.heap[curr], candidate)){
                break;
            }
                                    
            if(candidate === l){
                this.heap[li] = this.heap[curr];
                this.heap[curr] = l;
                curr = li
                
            }else{
                
                this.heap[ri] = this.heap[curr];
                this.heap[curr] = r;
                curr = ri
            }
        }
        
        return removed;
    }
}

