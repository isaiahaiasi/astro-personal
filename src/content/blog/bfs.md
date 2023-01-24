---
title: Breadth-First Search
publishedAt: 2023-01-15
slug: breadth-first-search
description: "Notes on using Breadth-First Search (BFS) for traversing a graph."
tags: ["algorithms"]
---
Good for finding the shortest number of nodes between 2 nodes (aka, shortest path in an unweighted graph)

```python
def bfs(nodes, start):
  queue = deque([start])
  start.queued = True
  while queue:
    r = queue.popleft()
    visit(r)
    for neighbor in get_neighbors(r):
      if not neighbor.queued:
        queue.append(neighbor)
        neighbor.queued == True
```

## Variations/Tricks

### Accumulating Rows

If you want to *accumulate the rows* (for example, to count the number of "steps"), you can modify classic BFS slightly to increment step count each "row". Idk if this is actually a smart thing to do or not, but it's come in handy several times (before that, I was doing things like pushing the step count with the node onto the queue...)

```python
def bfs(nodes, start):
  queue = deque([start])
  start.queued = True
  steps = 0
  while queue:
    steps += 1
    for _ in range(len(queue)):
      r = queue.popleft()
      visit(r)
      for neighbor in get_neighbors(r):
        if not neighbor.queued:
          queue.append(neighbor)
          neighbor.queued == True
```