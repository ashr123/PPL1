#lang racket

(define vowels '(a e i o u))

; Signature: count-syllables-helper(text)
; Purpose: Returns a list whose first member isn't a vowel
; Type: [list -> list]
; Examples: (count-syllables-helper '(a a a a)) should produce '()
;           (count-syllables-helper '(b b b)) should produce '(b b b)
;           (count-syllables-helper '(T r u m p)) should produce '(T r u m p)
;           (count-syllables-helper '(i i i k)) should produce '(k)
;           (count-syllables-helper '()) should produce '()
(define count-syllables-helper
  (lambda (text)
    (cond ((empty? text) text)
          ((equal? (member (first text) vowels) #f) text)
          (else (count-syllables-helper (rest text))))))

; Signature: count-syllables(text)
; Purpose: Returns s the number of syllables in the word, consecutive vowels counts as one vowel
; Type: [list -> number]
; Examples: (count-syllables '(a a a a)) should produce 1
;           (count-syllables '(b b b)) should produce 0
;           (count-syllables '(T r u m p)) should produce 1
;           (count-syllables '(i i i k)) should produce 1
;           (count-syllables '()) should produce 0
(define count-syllables
    (lambda (text)
      (cond ((empty? text) 0)
            ((equal? (member (first text) vowels) #f) (count-syllables (rest text)))
            (else (+ 1 (count-syllables (count-syllables-helper (rest text))))))))

; Signature: sorted?(list, comp)
; Purpose: Returns #t if the list sorted according to comp
; Type: [list*procedure -> boolean]
; Examples: (sorted? '(1 3 5) <) should produce #t
;           (sorted? '(1 3 5) >) should produce #f
;           (sorted? '() <) should produce #t
;           (sorted? '() >) should produce #t
;           (sorted? '(0 0) <) should produce #f
(define sorted?
  (lambda (list comp)
    (cond ((empty? list) #t)
          ((equal? (length list) 1) #t)
          ((comp (first list) (second list)) (sorted? (rest list) comp))
          (else #f))))

; Signature: merge-helper(list1, list2)
; Purpose: Returns a list containing all of the numbers, in increasing order
; Type: [list*list -> list]
(define merge-helper
  (lambda (list1 list2)
    (cond ((and (empty? list1) (empty? list2)) '())
          ((empty? list1) list2)
          ((empty? list2) list1)
          ((< (first list1) (first list2)) (cons (first list1) (merge-helper (rest list1) list2)))
          ((= (first list1) (first list2)) (cons (first list1) (merge-helper (rest list1) (rest list2))))
          (else (cons (first list2) (merge-helper list1 (rest list2)))))))

; Signature: merge(list1, list2)
; Purpose: Returns a list containing all of the numbers, in increasing order
; Type: [list*list -> list]
; Pre-conditions: (sorted? list1 <) ==> #t, (sorted? list2 <) ==> #t
; Post-condition: (sorted? (merge list1 list2) <) ==> #t
; Examples: (merge '(1 3 8) '(2 5 6)) should produce '(1 2 3 5 6 8)
;           (merge '() '()) should produce '()
;           (merge '() '(2 5 6)) should produce '(2 5 6)
;           (merge '(1 3 8) '()) should produce '(1 3 8)
;           (merge '(-5 -3 0 3 5) '(-18 -10 -2 5)) should produce '(-18 -10 -5 -3 -2 0 3 5)
(define merge
  (lambda (list1 list2)
    (cond ((not (sorted? list1 <)) (raise-argument-error 'merge "sorted? <" 0 list1 list2))
          ((not (sorted? list2 <)) (raise-argument-error 'merge "sorted? <" 1 list1 list2))
           (else (merge-helper list1 list2)))))

; Signature: remove-adjacent-duplicates-helper(text, currMember)
; Purpose: Returns a list whose first member isn't equals to currMember
; Type: [list*object -> list]
; Examples: (remove-adjacent-duplicates-helper '(1 3 8) 1) should produce '(3 8)
;           (remove-adjacent-duplicates-helper '(1 1 1) 1) should produce '()
;           (remove-adjacent-duplicates-helper '(1 1 1) 2) should produce '(1 1 1)
;           (remove-adjacent-duplicates-helper '() '()) should produce '()
;           (remove-adjacent-duplicates-helper '() '(2)) should produce '()
(define remove-adjacent-duplicates-helper
  (lambda (text currMember)
    (cond ((empty? text) text)
          ((equal? (first text) currMember) (remove-adjacent-duplicates-helper (rest text) currMember))
          (else text))))

; Signature: remove-adjacent-duplicates(list)
; Purpose: Returns a list that doesn't have adjacent members duplicates
; Type: [list -> list]
; Examples: (remove-adjacent-duplicates ’(y a b b a d a b b a d o o)) should produce '(y a b a d a b a d o)
;           (remove-adjacent-duplicates ’(yeah yeah yeah)) should produce '(yeah)
;           (remove-adjacent-duplicates ’()) should produce '()
;           (remove-adjacent-duplicates ’(a)) should produce '(a)
;           (remove-adjacent-duplicates ’(b b b s o t)) should produce '(b s o t)
(define remove-adjacent-duplicates
  (lambda (list)
    (if (empty? list)
        list
        (cons (first list) (remove-adjacent-duplicates (remove-adjacent-duplicates-helper (rest list) (first list)))))))