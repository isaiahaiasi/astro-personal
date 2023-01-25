---
title: Disjoint Set/Union Find
description: Notes on the "Disjoint Set" data structure.
publishedAt: 2023-01-24
tags:
- algorithms
- graphs
- data structures
---

## Disjoint Set Union

A collection of disjoint sets, useful for merging partially-overlapping sets or finding the disjoint of sets (obviously. Eg, [Accounts Merge](https://leetcode.com/problems/accounts-merge/), [Number of Islands](https://leetcode.com/problems/number-of-islands/), or [Lowest Common Ancestor of Binary Tree](https://leetcode.com/problems/accounts-merge/) (and LCA problems in general)

[This set of slides](https://www.cs.princeton.edu/courses/archive/spring13/cos423/lectures/UnionFind.pdf) has some really clear & concise explanations of most of the important concepts regarding Disjoint Sets, along with some good explanations of the runtime complexity (and Proofs to boot!).

## Optimizations

### Quick find vs. Quick union.

This just refers to when you have to walk the tree to get to the root node. Quick Union is generally more efficient overall, despite worse worst-case time complexity.

### `Find()` Optimization - Path Compresion

The naive version of `find()` looks up the tree to get the root. What path compression does is set each parent to the root, until the parent  IS the root. This way subsequent finds will point directly to the root, instead of having to traverse a deep tree.

### `Union()` Optimization

Reducing tree depth by associating nodes with either a Size (number of descendants incl self) or a Rank (upper-bound of its height). Both have the same effect on runtime complexity.

## Links
https://leetcode.com/explore/featured/card/graph/618/disjoint-set/3881/

## Code

The implementation below uses "Quick Union", "Union-By-Size", and "Path Compression":

```python
class DisjointSet:
	def __init__(self, n: int):
		self.parent = [i for i in range(n)]
		self.size = [1]*n

		# 1 vs 0 doesn't really matter, except for correctness
		# self.rank = [0]*n

	def find(self, u: int) -> int:
		# with Path Compression
		if u != self.parent[u]:
			self.parent[u] = self.find(self.parent[u])
		return self.parent[u]

	# union-by-size
	def union(self, u: int, v: int) -> bool:
		pu, pv = self.find(u), self.find(v)
		if pu == pv:
			return False
		# merge smaller tree into larger
		if self.size[pu] < self.size[pv]:
			self.parent[pu] = pv
			self.size[pv] += self.size[pu]
		else:
			self.parent[pv] = pu
			self.size[pu] += self.size[pv]
		return True
```

```python
def union_by_rank(self, u, v):
	pu, pv = self.find(u), self.find(v)
	if pu == pv:
		return False

	if self.rank[pu] > self.rank[pv]:
		self.parent[pv] = pu
	elif self.rank[pu] < self.rank[pv]:
		self.parent[pu] = pv
	else:
		self.parent[pv] = pu
		self.rank[pu] += 1
	return True
```

```python
# find *without* Path Compression
def naive_find(self, u):
	while u != self.parent[u]:
		u = self.parent[u]
	return u
```
