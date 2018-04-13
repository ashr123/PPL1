#lang racket

(define vowels '(a e i o u))

; Signature: textIt(text)
; Purpose: Returns a list whose first member isn't a vowel
; Type: [list -> list]
; Example: (textIt '(a a a a)) should produce '()
;          (textIt '(b b b)) should produce '(b b b)
;          (textIt '(T r u m p)) should produce '(T r u m p)
;          (textIt '(i i i k)) should produce '(k)
;          (textIt '()) should produce '()
(define textIt
  (lambda (text)
    (cond ((empty? text) text)
          ((equal? (member (car text) vowels) #f) text)
          (else (textIt (cdr text))))))

; Signature: count-syllables(text)
; Purpose: Returns s the number of syllables in the word, consecutive vowels counts as one vowel
; Type: [list -> number]
; Example: (count-syllables '(a a a a)) should produce 1
;          (count-syllables '(b b b)) should produce 0
;          (count-syllables '(T r u m p)) should produce 1
;          (count-syllables '(i i i k)) should produce 1
;          (count-syllables '()) should produce 0
(define count-syllables
    (lambda (text)
      (cond ((empty? text) 0)
            ((equal? (member (car text) vowels) #f) (count-syllables (cdr text)))
            (else (+ 1 (count-syllables (textIt (cdr text))))))))

; Signature: sorted?(list, comp)
; Purpose: Returns #t if the list sorted according to comp
; Type: [list*procedure -> boolean]
; Example: (sorted? '(1 3 5) <) should produce #t
;          (sorted? '(1 3 5) >) should produce #f
;          (sorted? '() <) should produce #t
;          (sorted? '() >) should produce #t
;          (sorted? '(0 0) <) should produce #f
(define sorted?
  (lambda (list comp)
    (cond ((empty? list) #t)
          ((equal? (length list) 1) #t)
          ((comp (first list) (second list)) (sorted? (cdr list) comp))
          (else #f))))

; Signature: merge(list1, list2)
; Purpose: Returns a list containing all of the numbers, in increasing order
; Type: [list*list -> list]
; Example: (merge '(1 3 8) '(2 5 6)) should produce '(1 2 3 5 6 8)
;          (merge '() '()) should produce '()
;          (merge '() '(2 5 6)) should produce '(2 5 6)
;          (merge '(1 3 8) '()) should produce '(1 3 8)
;          (merge '(-5 -3 0 3 5) '(-18 -10 -2 5)) should produce '(-18 -10 -5 -3 -2 0 3 5 5)
(define merge
  (lambda (list1 list2)
    (cond ((and (empty? list1) (empty? list2)) '())
          ((empty? list1) list2)
          ((empty? list2) list1)
          ((< (first list1) (first list2)) (cons (first list1) (merge (cdr list1) list2)))
          (else (cons (first list2) (merge list1 (cdr list2)))))))

; Signature: textIt2(text, currMember)
; Purpose: Returns a list whose first member isn't equals to currMember
; Type: [list*object -> list]
; Example: (textIt2 '(1 3 8) 1) should produce '(3 8)
;          (textIt2 '(1 1 1) 1) should produce '()
;          (textIt2 '(1 1 1) 2) should produce '(1 1 1)
;          (textIt2 '() '()) should produce '()
;          (textIt2 '() '(2)) should produce '()
(define textIt2
  (lambda (text currMember)
    (cond ((empty? text) text)
          ((equal? (car text) currMember) (textIt2 (cdr text) currMember))
          (else text))))
;(define textIt2
;  (lambda (text currMember)
;    (if (empty? text)
;        text
;        (if (equal? (car text) currMember)
;            (textIt2 (cdr text) currMember)
;            text))))

; Signature: remove-adjacent-duplicates(list)
; Purpose: Returns a list that doesn't have adjacent members duplicates
; Type: [list -> list]
; Example: (remove-adjacent-duplicates ’(y a b b a d a b b a d o o)) should produce '(y a b a d a b a d o)
;          (remove-adjacent-duplicates ’(yeah yeah yeah)) should produce '(yeah)
;          (remove-adjacent-duplicates ’()) should produce '()
;          (remove-adjacent-duplicates ’(a)) should produce '(a)
;          (remove-adjacent-duplicates ’(b b b s o t)) should produce '(b s o t)
(define remove-adjacent-duplicates
  (lambda (list)
    (if (empty? list)
        list
        (cons (first list) (remove-adjacent-duplicates (textIt2 (cdr list) (first list)))))))